// ============================================================
// Timeline Generator — Auto-generates timeline from all content
// Never manually edited. Scans projects, patents, publications.
// ============================================================

import type { TimelineEvent } from './types';
import { getAllProjects, getAllPatents, getAllPublications, getAllExperience } from './contentLoader';

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
      const { year, month } = parseDate(project.completedDate);
      events.push({
        id: `project-${project.id}`,
        date: formatDate(year, month),
        year,
        month,
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
        title: `${project.title} — In Progress`,
        description: project.description,
        type: 'project',
        projectId: project.id,
      });
    }
  }

  // ---- Patents (separate events if not already from project) ----
  const patents = getAllPatents();
  for (const patent of patents) {
    const { year, month } = parseDate(patent.publishedDate);
    const existingProjectEvent = events.find(
      e => e.projectId === patent.projectId && e.year === year && e.month === month
    );
    if (!existingProjectEvent) {
      events.push({
        id: `patent-${patent.id}`,
        date: formatDate(year, month),
        year,
        month,
        title: `${patent.title} — Patent Published`,
        description: patent.abstract,
        type: 'patent',
        projectId: patent.projectId,
      });
    } else {
      // Enhance existing event
      existingProjectEvent.title = `${existingProjectEvent.title.replace(' — Completed', '')} — Patent Published`;
      existingProjectEvent.type = 'patent';
    }
  }

  // ---- Publications ----
  const publications = getAllPublications();
  for (const pub of publications) {
    const { year, month } = parseDate(pub.publishedDate);
    events.push({
      id: `publication-${pub.id}`,
      date: formatDate(year, month),
      year,
      month,
      title: `${pub.journal} Publication`,
      description: pub.title,
      type: 'publication',
      projectId: pub.projectId,
    });
  }

  // ---- Experience ----
  const experience = getAllExperience();
  for (const exp of experience) {
    const { year: startYear, month: startMonth } = parseDate(exp.startDate + '-01');
    events.push({
      id: `experience-${exp.id}-start`,
      date: formatDate(startYear, startMonth),
      year: startYear,
      month: startMonth,
      title: `${exp.organization} — ${exp.role}`,
      description: exp.description,
      type: 'experience',
    });

    if (exp.endDate) {
      const { year: endYear, month: endMonth } = parseDate(exp.endDate + '-01');
      if (endYear !== startYear || endMonth !== startMonth) {
        events.push({
          id: `experience-${exp.id}-end`,
          date: formatDate(endYear, endMonth),
          year: endYear,
          month: endMonth,
          title: `${exp.organization} — Internship Completed`,
          description: `Completed ${exp.duration || ''} at ${exp.organization}`,
          type: 'experience',
        });
      }
    }
  }

  // Sort chronologically (oldest first)
  events.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
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
