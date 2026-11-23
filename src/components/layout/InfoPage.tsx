import React from 'react';
import LastUpdated from '../LastUpdated';

/*
 * The frame for the site's reading pages that are not articles (About, Methodology, Sources,
 * Privacy, Funding, Contact, the 2026 overview): the page heading on the back-of-form ground,
 * then the content on a warm-white sheet in the shared `.article-body` reading style, so they
 * read like the article pages. See DESIGN.md "Info pages".
 */

interface PageHeaderProps {
  title: React.ReactNode;
  /** Lead paragraph under the heading. */
  intro?: React.ReactNode;
  /** ISO date for the "Last updated" line. */
  updated?: string;
  /** Anything else that belongs in the header (a search field, a small-print disclaimer). */
  children?: React.ReactNode;
  className?: string;
}

/** The page heading on the ground: display h1, a lead paragraph, the last-updated line. */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, intro, updated, children, className = '' }) => (
  <header className={`max-w-[46rem] ${className}`}>
    <h1 className="display text-4xl leading-[1.08] text-ink sm:text-5xl">{title}</h1>
    {intro && <div className="mt-4 text-[17px] leading-relaxed text-ink-soft">{intro}</div>}
    {updated && <LastUpdated date={updated} className="mt-4" />}
    {children}
  </header>
);

/** A warm-white sheet carrying long-form content in the article reading style. */
export const ProseSheet: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({
  children,
  className = '',
  id,
}) => (
  <div id={id} className={`on-paper bg-paper-white px-5 py-8 text-ink shadow-sheet-sm sm:px-10 sm:py-10 ${className}`}>
    <div className="article-body">{children}</div>
  </div>
);

interface InfoPageProps extends PageHeaderProps {
  /** Content after the main sheet (routing slips, CTAs), on the ground. */
  after?: React.ReactNode;
}

/** Header on the ground, the content on one prose sheet, optional extras below. */
const InfoPage: React.FC<InfoPageProps> = ({ title, intro, updated, children, after }) => (
  <div className="mx-auto max-w-[52rem] px-4 pb-20 pt-10 sm:px-6 lg:pt-14">
    <PageHeader title={title} intro={intro} updated={updated} />
    <ProseSheet className="mt-8">{children}</ProseSheet>
    {after && <div className="mt-10 space-y-8">{after}</div>}
  </div>
);

export default InfoPage;
