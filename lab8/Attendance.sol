// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Student Attendance System (Lab 8)
/// @notice Teacher-only attendance marking, unique student IDs, history with timestamps,
///         iterable student registry, and query for present students by day.
contract Attendance {
    // ---------------------------
    //           Types
    // ---------------------------
    struct AttendanceRecord {
        uint256 timestamp;
        bool present;
    }

    // ---------------------------
    //           Errors
    // ---------------------------
    error NotTeacher();
    error StudentAlreadyExists(uint256 studentId);
    error StudentNotFound(uint256 studentId);

    // ---------------------------
    //           State
    // ---------------------------
    address public immutable teacher;

    // Registry of students for iteration
    uint256[] private studentIds;
    mapping(uint256 => bool) private studentExists;

    // Attendance history per student
    mapping(uint256 => AttendanceRecord[]) private attendanceHistory;

    // Track presence by day (day = timestamp / 1 days) for quick queries
    // We store only the latest boolean for a (day, studentId).
    mapping(uint256 => mapping(uint256 => bool)) private presentOnDay;

    // ---------------------------
    //           Events
    // ---------------------------
    event StudentRegistered(uint256 indexed studentId);
    event AttendanceMarked(uint256 indexed studentId, bool present, uint256 indexed day, uint256 timestamp);

    // ---------------------------
    //         Modifiers
    // ---------------------------
    modifier onlyTeacher() {
        if (msg.sender != teacher) revert NotTeacher();
        _;
    }

    // ---------------------------
    //        Constructor
    // ---------------------------
    constructor(address teacherAddress) {
        teacher = teacherAddress;
    }

    // ---------------------------
    //        Registration
    // ---------------------------
    function registerStudent(uint256 studentId) external onlyTeacher {
        if (studentExists[studentId]) revert StudentAlreadyExists(studentId);
        studentExists[studentId] = true;
        studentIds.push(studentId);
        emit StudentRegistered(studentId);
    }

    // ---------------------------
    //      Mark Attendance
    // ---------------------------
    /// @notice Mark attendance for a student at current block time.
    /// @param studentId Unique student identifier
    /// @param present True if present, false if absent
    function markAttendance(uint256 studentId, bool present) external onlyTeacher {
        if (!studentExists[studentId]) revert StudentNotFound(studentId);

        uint256 nowTs = block.timestamp;
        uint256 day = nowTs / 1 days; // day bucket since Unix epoch

        attendanceHistory[studentId].push(AttendanceRecord({timestamp: nowTs, present: present}));

        // Record latest presence for the day. If flipped to false later the query will reflect that.
        presentOnDay[day][studentId] = present;

        emit AttendanceMarked(studentId, present, day, nowTs);
    }

    // ---------------------------
    //        View Functions
    // ---------------------------
    /// @notice Returns whether a student is registered.
    function isRegistered(uint256 studentId) external view returns (bool) {
        return studentExists[studentId];
    }

    /// @notice Get all registered student IDs.
    function getAllStudentIds() external view returns (uint256[] memory) {
        return studentIds;
    }

    /// @notice Get full attendance history for a student.
    function getAttendanceHistory(uint256 studentId) external view returns (AttendanceRecord[] memory) {
        if (!studentExists[studentId]) revert StudentNotFound(studentId);
        return attendanceHistory[studentId];
    }

    /// @notice Get all students marked present for a specific day.
    /// @dev Day is the integer bucket computed as timestamp / 1 days.
    /// @param day Day bucket (e.g., block.timestamp / 1 days)
    function getPresentStudents(uint256 day) external view returns (uint256[] memory) {
        // Count present first to size the array
        uint256 count = 0;
        for (uint256 i = 0; i < studentIds.length; i++) {
            uint256 sid = studentIds[i];
            if (presentOnDay[day][sid]) {
                count++;
            }
        }

        uint256[] memory presentStudents = new uint256[](count);
        uint256 idx = 0;
        for (uint256 i = 0; i < studentIds.length; i++) {
            uint256 sid = studentIds[i];
            if (presentOnDay[day][sid]) {
                presentStudents[idx++] = sid;
            }
        }
        return presentStudents;
    }
}


