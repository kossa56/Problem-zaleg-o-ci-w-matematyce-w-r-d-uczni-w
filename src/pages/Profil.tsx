import { useRole } from "@/contexts/RoleContext";
import StudentProfile from "@/components/profil/StudentProfile";
import TeacherProfile from "@/components/profil/TeacherProfile";

const Profil = () => {
  const { isTeacher } = useRole();
  return isTeacher ? <TeacherProfile /> : <StudentProfile />;
};

export default Profil;
