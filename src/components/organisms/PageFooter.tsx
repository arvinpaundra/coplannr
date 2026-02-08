interface PageFooterProps {
  version?: string;
  build?: string;
  links?: Array<{ label: string; href: string }>;
  className?: string;
}

export const PageFooter = ({
  version = 'v1.0.4-beta',
  build = 'BUILD 2293',
  links = [
    { label: 'Help Center', href: '#' },
    { label: 'API Docs', href: '#' },
    { label: 'Report Bug', href: '#' },
  ],
  className = '',
}: PageFooterProps) => {
  return (
    <footer
      className={`mt-12 px-4 py-6 border-t border-neutral-300 ${className}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
        <div>
          {version} // {build}
        </div>
        <div className="flex gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
