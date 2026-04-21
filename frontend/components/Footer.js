import { Radio, Twitter, Instagram, Youtube, Github, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-background">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="glass-card p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 border-primary/10 overflow-hidden relative group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-2">Join the Future</h3>
            <p className="text-white/40">Subscribe for early access to new releases.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2 relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors flex-1 md:w-80"
            />
            <button className="bg-primary text-black p-4 rounded-2xl hover:scale-105 transition-transform cursor-target">
              <Send size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary rounded-lg">
                <Radio className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">Apex</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed">
              Pioneering the future of personal acoustics through relentless innovation. Experience sound like never before.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-primary">Warranty</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors cursor-target">Policies</a></li>
              <li><a href="#" className="hover:text-white transition-colors cursor-target">Tech Specs</a></li>
              <li><a href="#" className="hover:text-white transition-colors cursor-target">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-primary">Support</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors cursor-target">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors cursor-target">Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors cursor-target">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
          <div className="flex gap-6">
            <Twitter className="w-5 h-5 text-white/20 hover:text-primary transition-colors cursor-pointer cursor-target" />
            <Instagram className="w-5 h-5 text-white/20 hover:text-primary transition-colors cursor-pointer cursor-target" />
            <Youtube className="w-5 h-5 text-white/20 hover:text-primary transition-colors cursor-pointer cursor-target" />
            <Github className="w-5 h-5 text-white/20 hover:text-primary transition-colors cursor-pointer cursor-target" />
          </div>
          <p className="text-xs text-white/20 font-medium">
            © 2024 Apex Labs. Cyber Outliers.
          </p>
        </div>
      </div>
    </footer>
  );
}
