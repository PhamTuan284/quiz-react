import { FaFire } from "react-icons/fa";

export default function Streak({ streak }) {
  return (
    <div className="streak btn-group" role="group">
      <div
        className={
          streak === 1 || streak === 2 || streak >= 3
            ? "btn streakLeft d-flex align-items-center justify-content-start streakActive"
            : "btn streakLeft d-flex align-items-center justify-content-start"
        }
      >
        Streak
      </div>

      <div
        className={
          streak === 2 || streak >= 3
            ? "btn streakMid streakActive"
            : "btn streakMid"
        }
      ></div>

      <div
        className={
          streak >= 3
            ? "btn streakRight d-flex align-items-center justify-content-end streakActive"
            : "btn streakRight d-flex align-items-center justify-content-end"
        }
      >
        <FaFire />
        {streak}
      </div>
    </div>
  );
}
