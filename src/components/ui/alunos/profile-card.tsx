import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/alunos/avatar";

interface StudentProfile {
  nome: string;
  emailAluno: string;
  matriculaAluno: string;
}

interface ProfileCardProps {
  studentData: StudentProfile | null;
  loading: boolean;
  error: string | null;
}

export function ProfileCard({ studentData, loading, error }: ProfileCardProps) {
  // Exibir mensagem de carregamento
  if (loading) {
    return (
      <div className="w-full rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white">Carregando...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Exibir mensagem de erro
  if (error) {
    return (
      <div className="w-full rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>!</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white">Erro</h2>
            <p className="text-sm text-white/90">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Exibir os dados do estudante
  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 p-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?t=st=1738800543~exp=1738804143~hmac=5400a6f0c02663ed6f91ff172c490ed49dbd456d03bed9e4c98b2aed06b0dfdb&w=826" />
          <AvatarFallback>
            {studentData?.nome
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white max-md:text-[16px]">
            {studentData?.nome || "Nome não disponível"}
          </h2>
          <p className="text-sm text-white/90 max-md:text-[11px]">
            {studentData?.emailAluno || "Email não disponível"}
          </p>
          <p className="text-xs text-white/80 max-md:text-[11px]">
            {studentData?.matriculaAluno || "Matrícula não disponível"}
          </p>
        </div>
      </div>
    </div>
  );
}