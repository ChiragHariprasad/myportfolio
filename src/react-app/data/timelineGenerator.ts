// ============================================================
// Timeline Generator — Auto-generates timeline from all content
// Never manually edited. Scans projects, patents, publications.
// ============================================================

import type { TimelineEvent } from './types';
import { getAllProjects, getAllPatents, getAllPublications, getAllExperience, getAllMilestones } from './contentLoader';

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseDate(dateStr: string): { year: number; month: number; day?: number } {
  const parts = dateStr.split('-').map(Number);
  return { year: parts[0], month: parts[1] || 1, day: parts[2] };
}

function formatDate(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

export function generateTimeline(): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // ---- Projects ----
  const projects = getAllProjects();
  for (const project of projects) {
    if (project.completedDate) {
      const { year, month, day } = parseDate(project.completedDate);
      events.push({
        id: `project-${project.id}`,
        date: formatDate(year, month),
        year,
        month,
        day,
        title: `${project.title} — ${project.status === 'completed' ? 'Completed' : 'Published'}`,
        description: project.description,
        type: 'project',
        projectId: project.id,
      });
    } else if (project.status === 'in-progress') {
      events.push({
        id: `project-${project.id}`,
        date: `${project.year} — In Progress`,
        year: project.year,
        month: project.month || 12,
        day: 31,
        title: `${project.title} — In Progress`,
        description: project.description,
        type: 'project',
        projectId: project.id,
      });
    }
  }

  // ---- Patents (separate events if not already from project) ----
  const patents = getAllPatents();
  patents.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate)); // sort by date
  for (let i = 0; i < patents.length; i++) {
    const patent = patents[i];
    const isFirstPatent = i === 0;
    const { year, month, day } = parseDate(patent.publishedDate);
    const existingProjectEvent = events.find(
      e => e.projectId === patent.projectId && e.year === year && e.month === month
    );
    if (!existingProjectEvent) {
      events.push({
        id: `patent-${patent.id}`,
        date: formatDate(year, month),
        year,
        month,
        day,
        title: `${patent.title} — Patent Published`,
        description: patent.abstract,
        type: 'patent',
        projectId: patent.projectId,
        image: isFirstPatent ? '/assets/1st-patent.png' : undefined,
      });
    } else {
      // Enhance existing event
      existingProjectEvent.title = `${existingProjectEvent.title.replace(' — Completed', '')} — Patent Published`;
      existingProjectEvent.type = 'patent';
      if (isFirstPatent) existingProjectEvent.image = '/assets/1st-patent.png';
    }
  }

  // ---- Publications ----
  const publications = getAllPublications();
  publications.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate));
  for (let i = 0; i < publications.length; i++) {
    const pub = publications[i];
    const isFirstPub = i === 0;
    const { year, month, day } = parseDate(pub.publishedDate);
    events.push({
      id: `publication-${pub.id}`,
      date: formatDate(year, month),
      year,
      month,
      day,
      title: `${pub.journal} Publication`,
      description: pub.title,
      type: 'publication',
      projectId: pub.projectId,
      image: isFirstPub ? '/assets/1st-paper.png' : undefined,
    });
  }

  // ---- Experience ----
  const experience = getAllExperience();
  for (const exp of experience) {
    const { year: startYear, month: startMonth, day: startDay } = parseDate(exp.startDate + '-01');
    events.push({
      id: `experience-${exp.id}-start`,
      date: formatDate(startYear, startMonth),
      year: startYear,
      month: startMonth,
      day: startDay,
      title: `${exp.organization} — ${exp.role}`,
      description: exp.description,
      type: 'experience',
      image: exp.type === 'internship' ? `/assets/internship-${exp.id}.png` : undefined,
    });

    if (exp.endDate) {
      const { year: endYear, month: endMonth, day: endDay } = parseDate(exp.endDate + '-01');
      if (endYear !== startYear || endMonth !== startMonth) {
        events.push({
          id: `experience-${exp.id}-end`,
          date: formatDate(endYear, endMonth),
          year: endYear,
          month: endMonth,
          day: endDay,
          title: `${exp.organization} — Internship Completed`,
          description: `Completed ${exp.duration || ''} at ${exp.organization}`,
          type: 'experience',
        });
      }
    }
  }

  // ---- Milestones ----
  const milestones = getAllMilestones();
  for (const ms of milestones) {
    const { year, month, day } = parseDate(ms.date);
    events.push({
      id: `milestone-${ms.id}`,
      date: formatDate(year, month),
      year,
      month,
      day,
      title: ms.title,
      description: ms.description,
      type: 'milestone',
      image: ms.image,
    });
  }

  // Sort chronologically (oldest first)
  events.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return (a.day || 1) - (b.day || 1);
  });

  return events;
}

/** Get timeline grouped by year */
export function getTimelineByYear(): Map<number, TimelineEvent[]> {
  const events = generateTimeline();
  const grouped = new Map<number, TimelineEvent[]>();

  for (const event of events) {
    if (!grouped.has(event.year)) {
      grouped.set(event.year, []);
    }
    grouped.get(event.year)!.push(event);
  }

  return grouped;
}
