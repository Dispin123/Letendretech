import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="site-logo">
              <span className="logo-mark">LT</span>
              Letendre Tech
            </Link>
            <p>
              Straightforward tech, real results. Serving small businesses across
              southeastern Massachusetts and Rhode Island.
            </p>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/managed-it">Managed IT</Link></li>
              <li><Link href="/services/assessment">Technology Assessments</Link></li>
              <li><Link href="/services/it-projects">IT Projects</Link></li>
              <li><Link href="/services/cybersecurity">Cybersecurity</Link></li>
              <li><Link href="/services/workflow-modernization">Workflow Modernization</Link></li>
              <li><Link href="/services/web-design">Websites &amp; Apps</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/work/jmckinnon">Our Work</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/contact">Get a Quote</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:7742600259">(774) 260-0259</a>
              </li>
              <li>
                <a href="mailto:nathan@letendretech.com">
                  nathan@letendretech.com
                </a>
              </li>
              <li style={{ color: "var(--slate)", fontSize: "14px" }}>
                Middleborough, MA
              </li>
              <li style={{ color: "var(--slate)", fontSize: "14px" }}>
                Serving greater SE Mass &amp; RI
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Letendre Tech LLC. All rights reserved.</span>
          <span>
            Built by{" "}
            <a href="https://letendretech.com">Letendre Tech</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
