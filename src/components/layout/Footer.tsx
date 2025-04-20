
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 md:py-0 mt-auto border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {currentYear} Startup AI Navigator. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
