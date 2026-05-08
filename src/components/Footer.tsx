const Footer = () => (
  <footer className="border-t bg-card mt-16">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <span className="font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>KisanMitra</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 KisanMitra. Empowering Farmers Everywhere.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
