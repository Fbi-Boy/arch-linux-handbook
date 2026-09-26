import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const pathways = [
  ['Installation', 'Prepare, partition, install, configure, boot.', '/docs/01-preparation'],
  ['Hardware', 'Diagnose and configure real devices safely.', '/docs/11-hardware'],
  ['Security', 'Build a practical security baseline.', '/docs/12-security'],
  ['Recovery', 'Troubleshoot by failure layer, not guesswork.', '/docs/99-troubleshooting'],
];

export default function Home() {
  return (
    <Layout title="Arch Linux Handbook" description="A practical Arch Linux installation and recovery handbook.">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrow}>TECHNICAL HANDBOOK</div>
              <Heading as="h1">Arch Linux, without the guesswork.</Heading>
              <p>
                A structured guide for installing, configuring, understanding, and recovering Arch Linux.
                Every critical step has a checkpoint, verification, and recovery path.
              </p>
              <div className={styles.actions}>
                <Link className={clsx('button', 'button--primary', 'button--lg')} to="/docs/01-preparation">
                  Start installation
                </Link>
                <Link className={clsx('button', 'button--secondary', 'button--lg')} to="/docs/00-introduction">
                  Explore handbook
                </Link>
              </div>
            </div>
            <div className={styles.signal}>
              <div className={styles.signalTop}>INSTALLATION FLOW</div>
              <div className={styles.flow}>
                <span>PREPARE</span><i>→</i><span>VERIFY</span><i>→</i><span>INSTALL</span>
                <i>→</i><span>CONFIGURE</span><i>→</i><span>RECOVER</span>
              </div>
              <div className={styles.signalBottom}>STOP • CHECK • VERIFY • CONTINUE</div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <div className={styles.eyebrow}>BUILT FOR REAL INSTALLATIONS</div>
              <Heading as="h2">Three states. One clear path.</Heading>
            </div>
            <p>Learn the concept, execute the procedure, then recover systematically when reality disagrees.</p>
          </div>

          <div className={styles.grid}>
            {pathways.map(([title, text, href]) => (
              <Link className={styles.card} to={href} key={title}>
                <span className={styles.cardIndex}>0{pathways.findIndex((x) => x[0] === title) + 1}</span>
                <Heading as="h3">{title}</Heading>
                <p>{text}</p>
                <span className={styles.cardLink}>Open guide →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
