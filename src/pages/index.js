import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const pathways = [
  ['01', 'Installation', 'Prepare, partition, install, configure, boot.', '/docs/01-preparation'],
  ['02', 'Hardware', 'Inventory, configure, validate, and diagnose devices.', '/docs/11-hardware'],
  ['03', 'Security', 'Build practical, layered controls you can verify.', '/docs/12-security'],
  ['04', 'Recovery', 'Classify failures by layer and repair from evidence.', '/docs/99-troubleshooting'],
];

const quickLinks = [
  ['Command reference', '/docs/introduction/command-reference'],
  ['Recovery matrix', '/docs/troubleshooting/recovery-matrix'],
  ['Architecture map', '/docs/introduction/architecture-map'],
  ['Release readiness', '/docs/maintenance/release-and-readiness'],
];

export default function Home() {
  return (
    <Layout title="Arch Linux Handbook" description="A practical Arch Linux installation, configuration, troubleshooting, and recovery handbook.">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrow}>TECHNICAL HANDBOOK · RECOVERY-FIRST</div>
              <Heading as="h1">Arch Linux, without the guesswork.</Heading>
              <p>
                Install with checkpoints. Configure with intent. Troubleshoot from evidence.
                Recover by layer instead of repeating random fixes.
              </p>
              <div className={styles.actions}>
                <Link className={clsx('button', 'button--primary', 'button--lg')} to="/docs/01-preparation">
                  Start installation
                </Link>
                <Link className={clsx('button', 'button--secondary', 'button--lg')} to="/docs/99-troubleshooting">
                  I need recovery
                </Link>
              </div>
              <div className={styles.signalLine}>
                <span>STOP</span><i>→</i><span>CHECK</span><i>→</i><span>VERIFY</span><i>→</i><span>CONTINUE</span>
              </div>
            </div>

            <div className={styles.architectureCard}>
              <div className={styles.signalTop}>SYSTEM LAYERS</div>
              <img src="/arch-linux-handbook/img/architecture-map.svg" alt="Layered Arch Linux system architecture map" />
              <Link to="/docs/introduction/architecture-map">Open architecture map →</Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <div className={styles.eyebrow}>CHOOSE YOUR PATH</div>
              <Heading as="h2">One handbook, four entry points.</Heading>
            </div>
            <p>Start from your current state. The documentation converges on the same verification and recovery model.</p>
          </div>

          <div className={styles.grid}>
            {pathways.map(([index, title, text, href]) => (
              <Link className={styles.card} to={href} key={title}>
                <span className={styles.cardIndex}>{index}</span>
                <Heading as="h3">{title}</Heading>
                <p>{text}</p>
                <span className={styles.cardLink}>Open guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.quickSection}>
          <div className={styles.quickHeader}>
            <div className={styles.eyebrow}>REFERENCE DECK</div>
            <Heading as="h2">Jump straight to the tool you need.</Heading>
          </div>
          <div className={styles.quickGrid}>
            {quickLinks.map(([label, href]) => (
              <Link to={href} key={href}>{label}<span>↗</span></Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
