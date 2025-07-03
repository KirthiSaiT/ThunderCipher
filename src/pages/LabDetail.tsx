import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy } from 'lucide-react';

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  content: string | null;
  hints: string[] | null;
  solution: string | null;
  created_at: string;
  updated_at: string;
}

const LabDetail = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [lab, setLab] = useState<Lab | null>(null);
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLab = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('labs')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setLab(null);
      } else {
        setLab(data as Lab);
      }
      setLoading(false);
    };
    fetchLab();
  }, [id]);

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just check if flag matches solution (insecure, for demo)
    if (flag.trim() === lab?.solution) {
      setMessage('Correct flag!');
    } else {
      setMessage('Incorrect flag. Try again!');
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400 font-mono">Loading lab...</div>;
  }
  if (!lab) {
    return <div className="text-center py-12 text-red-400 font-mono">Lab not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        <Card className="glass-card p-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold gradient-text mb-2">{lab.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-gray-400 font-mono text-sm">Category: {lab.category}</span>
            <span className="text-gray-400 font-mono text-sm">Difficulty: {lab.difficulty}</span>
            <span className="flex items-center text-yellow-400 font-mono text-sm"><Trophy size={16} className="mr-1" />{lab.points}</span>
          </div>
          <p className="mb-4 text-gray-300">{lab.description}</p>
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-1">CTF Type</h2>
            <p className="text-cyan-300 font-mono">{lab.category}</p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-1">Flag Format</h2>
            <p className="text-cyan-300 font-mono">flag&#123;...&#125;</p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-1">Challenge</h2>
            <pre className="bg-black/40 rounded p-4 text-gray-200 whitespace-pre-wrap font-mono text-sm">{lab.content}</pre>
          </div>
          {lab.hints && lab.hints.length > 0 && (
            <div className="mb-4">
              <h2 className="font-bold text-lg mb-1">Hints</h2>
              <ul className="list-disc list-inside text-cyan-200">
                {lab.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleFlagSubmit} className="flex flex-col md:flex-row gap-2 mt-6">
            <Input
              placeholder="Enter flag..."
              value={flag}
              onChange={e => setFlag(e.target.value)}
              className="glass-input border-cyan-500/30 bg-black/30 text-white placeholder-gray-400"
            />
            <Button type="submit" className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold">Submit Flag</Button>
          </form>
          {message && <div className="mt-2 text-center font-mono text-cyan-400">{message}</div>}
        </Card>
      </div>
    </div>
  );
};

export default LabDetail; 