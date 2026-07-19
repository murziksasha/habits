# 16 — Classroom Homework

## Overview

Teachers assign a specific **lesson** to a **class**. Each student gets a submission row. Completing the lesson in the product automatically marks the homework done.

## Tables

### `class_assignments`
- `classId`, `createdByUserId`
- `titleUk` / `titleEn`
- `courseId`, `lessonId`
- `dueAt` (optional)

### `assignment_submissions`
- Unique `(assignmentId, userId)`
- `status`: `assigned` | `completed` | `overdue` (overdue computed on read)
- `score`, `completedAt`

## API

| Method | Path | Who | Description |
|--------|------|-----|-------------|
| POST | `/homework` | teacher/owner | Create assignment + fan-out submissions + notify |
| GET | `/homework/mine` | student | My homework list |
| GET | `/homework/class/:classId` | teacher/student | Board with stats |
| DELETE | `/homework/:id` | teacher | Delete assignment |

### Create body

```json
{
  "classId": "uuid",
  "titleUk": "HW 1",
  "titleEn": "HW 1",
  "courseId": "uuid",
  "lessonId": "uuid",
  "dueAt": "2026-07-20T18:00:00.000Z"
}
```

## Auto-complete

On successful lesson submit (`accuracy >= 0.5`), `completeHomeworkForLesson(userId, lessonId, score)` updates matching `assigned` submissions.

Response field: `homeworkCompleted` (count).

## UI

| Path | Role |
|------|------|
| `/homework` | Student list + open lesson |
| `/schools/class/[classId]` | Teacher create form + progress board |

Nav: **Homework** / **Домашка**

## Permissions

- Create/delete: class teacher, org owner/teacher, or platform admin
- View class board: teachers or class members
