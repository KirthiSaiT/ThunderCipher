import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  points: number;
  content: string | null;
  hints: string[] | null;
  solution: string | null;
  created_at: string;
  updated_at: string;
}

const LabDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('challenge');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setChallenge(null);
      } else {
        setChallenge(data as Challenge);
      }
      setLoading(false);
    };
    fetchChallenge();
    // Check if already completed
    const checkCompleted = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', id)
        .single();
      if (data) setCompleted(true);
    };
    checkCompleted();
  }, [id, user]);

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('✅ Correct flag!');
    if (user && challenge && !completed) {
      // 1. Mark lab as completed for the user
      await supabase
        .from('user_lab_progress')
        .upsert([
          {
            user_id: user.id,
            lab_id: challenge.id,
            completed: true,
            completed_at: new Date().toISOString(),
          }
        ], { onConflict: 'user_id,lab_id' });
      // 2. Increment user's points in profiles
      // Fetch current points
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();
      if (!error && profile) {
        const newPoints = (profile.points || 0) + challenge.points;
        await supabase
          .from('profiles')
          .update({ points: newPoints })
          .eq('id', user.id);
        // Recalculate and update ranks for all users
        const { data: allUsers, error: allUsersError } = await supabase
          .from('profiles')
          .select('id, points');
        if (!allUsersError && Array.isArray(allUsers)) {
          // Sort users by points descending
          const sorted = [...allUsers].sort((a, b) => (b.points || 0) - (a.points || 0));
          // Assign ranks and update
          for (let i = 0; i < sorted.length; i++) {
            const userId = sorted[i].id;
            const rank = i + 1;
            await supabase
              .from('profiles')
              .update({ rank })
              .eq('id', userId);
          }
        }
      }
      setCompleted(true);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400 font-mono">Loading challenge...</div>;
  }
  if (!challenge) {
    return <div className="text-center py-12 text-red-400 font-mono">Challenge not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Challenge Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card p-8 animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold gradient-text mb-2">{challenge.title}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`capitalize ${challenge.difficulty === 'hard' ? 'bg-red-600' : challenge.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-green-600'}`}>{challenge.difficulty}</Badge>
                    <Badge className="bg-cyan-700 capitalize">{challenge.category}</Badge>
                    <span className="text-cyan-400 font-mono flex items-center ml-2"><Trophy size={18} className="mr-1" />{challenge.points} pts</span>
                  </div>
                </div>
              </div>
              <p className="mb-4 text-gray-300 text-lg">{challenge.description}</p>
              <Tabs value={tab} onValueChange={setTab} className="w-full mt-6">
                <TabsList className="w-full flex justify-between bg-slate-800/60 mb-4">
                  <TabsTrigger value="challenge" className="flex-1">Challenge</TabsTrigger>
                  <TabsTrigger value="hints" className="flex-1">Hints</TabsTrigger>
                  <TabsTrigger value="writeup" className="flex-1">Writeup</TabsTrigger>
                </TabsList>
                <TabsContent value="challenge">
                  <div className="mb-4">
                    <h2 className="font-bold text-lg mb-1">Challenge Details</h2>
                    <pre className="bg-black/40 rounded p-4 text-gray-200 whitespace-pre-wrap font-mono text-base">{challenge.content}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="hints">
                  <div className="mb-4">
                    <h2 className="font-bold text-lg mb-1">Hints</h2>
                    {challenge.hints && challenge.hints.length > 0 ? (
                      <ul className="list-disc list-inside text-cyan-200 space-y-2">
                        {challenge.hints.map((hint, idx) => (
                          <li key={idx}>{hint}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 font-mono">No hints available for this challenge.</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="writeup">
                  <div className="mb-4">
                    <h2 className="font-bold text-lg mb-1">Writeup</h2>
                    <p className="text-gray-400 font-mono">Writeup will be available after solving the challenge.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          {/* Sidebar: Flag Submission & Stats */}
          <div className="space-y-6">
            <Card className="glass-card p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">Submit Flag</h2>
              {completed ? (
                <div className="text-green-400 font-mono text-center mb-2">Challenge Completed! 🎉</div>
              ) : null}
              <form onSubmit={handleFlagSubmit} className="flex flex-col gap-3">
                <Input
                  placeholder="flag{your_answer_here}"
                  value={flag}
                  onChange={e => setFlag(e.target.value)}
                  className="glass-input border-cyan-500/30 bg-black/30 text-white placeholder-gray-400"
                  disabled={completed}
                />
                <Button type="submit" className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold" disabled={completed}>Submit Flag</Button>
              </form>
              {message && <div className={`mt-2 text-center font-mono ${message.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>{message}</div>}
            </Card>
            <Card className="glass-card p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Challenge Stats</h2>
              <div className="space-y-2">
                <div className="flex justify-between font-mono">
                  <span>Points</span>
                  <span className="text-cyan-400 font-bold">{challenge.points}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Difficulty</span>
                  <Badge className={`capitalize ${challenge.difficulty === 'hard' ? 'bg-red-600' : challenge.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-green-600'}`}>{challenge.difficulty}</Badge>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Category</span>
                  <span className="capitalize">{challenge.category}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Status</span>
                  <span className="text-yellow-400">Unsolved</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDetail; 