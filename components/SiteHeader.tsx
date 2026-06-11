import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="site-logo">
          <span className="logo-mark">LT</span>
          Letendre Tech
        </Link>

        <nav className="site-nav">
          <Link href="/services/managed-it">IT Services</Link>
          <Link href="/services/workflow-modernization">Modernization</Link>
          <Link href="/services/web-design">Websites</Link>
          <Link href="/work/jmckinnon">Our Work</Link>
          <Link href="/contact" className="btn btn-primary">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
