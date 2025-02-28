"use client"

import { Button } from "@/components/ui/institution/button"
import { Checkbox } from "@/components/ui/institution/checkbox"
import { Input } from "@/components/ui/institution/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/institution/select"
import Sidebar from "@/components/layout/sidebarInstitution";
import SearchInput from "@/components/ui/search"
export default function CreateClass() {
  return (
    <div className="flex flex-row bg-[#F0F7FF] items-center">
    <Sidebar/>
    <div className="container mx-auto p-6 space-y-6 max-w-5xl h-1/2 bg-[#ffffff] rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Nome da turma</label>
            <Input className="bg-blue-50" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Período</label>
            <Select>
              <SelectTrigger className="bg-blue-50">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Manhã</SelectItem>
                <SelectItem value="afternoon">Tarde</SelectItem>
                <SelectItem value="evening">Noite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Ano letivo</label>
            <Select>
              <SelectTrigger className="bg-blue-50">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Capacidade máxima</label>
              <Input type="number" className="bg-blue-50" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">N° da sala</label>
              <Input className="bg-blue-50" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm text-muted-foreground mb-4">Seleção de docentes</h3>
          <div className="space-y-3">
            {["Karla Dias", "Bruna Torres", "Breno Odiz", "Caroline Sanches", "Daniel Ferreira"].map((teacher) => (
              <div key={teacher} className="flex items-center space-x-2">
                <Checkbox id={teacher.toLowerCase().replace(" ", "-")} />
                <label htmlFor={teacher.toLowerCase().replace(" ", "-")}>{teacher}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-muted-foreground mb-4">Seleção de diciplinas</h3>
          <div className="space-y-3">
            {["Português", "Matemática", "Geografia", "Ciências", "ED. Física"].map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox id={subject.toLowerCase().replace(" ", "-")} />
                <label htmlFor={subject.toLowerCase().replace(" ", "-")}>{subject}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="w-full flex flex-row justify-center">
          <SearchInput placeholder='Digite o nome ou Nº da matricula'/> 
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
          <div className="max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            <table className="w-full">
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="p-2">
                      <div className="flex items-center justify-between">
                        <div className="w-full flex flex-row items-center">
                          <span>Alice Fernandes</span>
                          <span className="text-sm text-muted-foreground ml-2">2025001</span>
                          <div className="flex flex-row justify-end w-[50%]">
                          <Checkbox  />
                          </div>
                        </div>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">Salvar edição</Button>
      </div>
    </div>
    </div>
  )
}

