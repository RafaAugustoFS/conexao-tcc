import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/alunos/avatar"
 
interface ProfileCardProps {
  name: string
  email: string
  id: string
}
 
export function ProfileCard({ name, email, id }: ProfileCardProps) {
  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?t=st=1738800543~exp=1738804143~hmac=5400a6f0c02663ed6f91ff172c490ed49dbd456d03bed9e4c98b2aed06b0dfdb&w=826" />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white">{name}</h2>
          <p className="text-sm text-white/90">{email}</p>
          <p className="text-xs text-white/80">{id}</p>
        </div>
      </div>
    </div>
  )
}