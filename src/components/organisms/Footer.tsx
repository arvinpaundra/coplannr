export const Footer = () => {
  const links = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-white p-8 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="text-lg font-bold uppercase tracking-tight mb-1">
            COPLANNR.XYZ
          </div>
          <div className="font-mono text-xs text-neutral-500">
            © {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>

        <div className="flex flex-wrap gap-6 md:gap-12 font-mono text-sm font-bold uppercase">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-brand-red decoration-2 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-4 border-t-2 border-neutral-100 text-center md:text-left">
        <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em]">
          Built for people who care about systems.
        </span>
      </div>
    </footer>
  );
};
