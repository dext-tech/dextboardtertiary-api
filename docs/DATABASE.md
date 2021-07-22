# DATABASE

## Tables

- courses
- files
- lessons
- users

### Courses

- id 🔑 : INT
- label : CHARS[11]
- creditHours : INT
- lecturerId : INT

### Files

- id 🔑 : auto-increment : INT
- fileid : STRING
- name : STRING
- extension : STRING
- size : INT
- url : STRING
- owner : INT
- createdAt : STRING

### Lessons

- id 🔑 : auto-increment : INT
- courseId : INT
- startTime : INT
- endTime : INT
- venueId : INT
- status : INT

### Users

- id 🔑 : auto-increment : INT
- name : STRING
- email : STRING
- dateRegistered : INT
