# Lab 8 - Student Attendance System

Solidity contract implementing a teacher-controlled attendance system with unique student IDs, history with timestamps, iterable student registry, and a function to get all present students for a given day.

## Files
- `Attendance.sol` – core contract

## Key Features
- Teacher-only actions enforced via `onlyTeacher`
- Register students (unique IDs)
- Mark attendance with timestamps
- Retrieve per-student attendance history
- Get all present students for a day using arrays + mappings
- Custom errors and events

## Deploy (Hardhat)
Example deploy script snippet:

```js
const hre = require("hardhat");

async function main() {
  const [deployer, teacher] = await hre.ethers.getSigners();
  const Attendance = await hre.ethers.getContractFactory("Attendance");
  const attendance = await Attendance.deploy(teacher.address);
  await attendance.waitForDeployment();
  console.log("Attendance deployed to:", await attendance.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
```

## Usage
- Register: `registerStudent(studentId)` (teacher only)
- Mark: `markAttendance(studentId, present)` (teacher only)
- Get IDs: `getAllStudentIds()`
- History: `getAttendanceHistory(studentId)` -> returns `[ { timestamp, present }, ... ]`
- Present today: compute `day = Math.floor(Date.now()/1000 / 86400)` and call `getPresentStudents(day)`

## Notes
- Day bucket is `timestamp / 1 days` (integer division).
- The latest mark on the same day determines presence for `getPresentStudents(day)`.
