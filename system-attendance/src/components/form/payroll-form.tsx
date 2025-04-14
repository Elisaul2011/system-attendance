"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock employees for the form
const mockEmployees = [
  { id: 1, name: "Juan Pérez" },
  { id: 2, name: "María García" },
  { id: 3, name: "Carlos López" },
  { id: 4, name: "Ana Martínez" },
  { id: 5, name: "Roberto Sánchez" },
  { id: 6, name: "Laura Rodríguez" },
  { id: 7, name: "Miguel Torres" },
  { id: 8, name: "Sofía Ramírez" },
];

const periods = ["Abril 2023", "Marzo 2023", "Febrero 2023", "Enero 2023"];

export default function PayrollForm({ payroll = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: payroll?.id || null,
    employeeId: payroll?.employeeId || "",
    period: payroll?.period || "Abril 2023",
    baseSalary: payroll?.baseSalary || 0,
    bonuses: payroll?.bonuses || 0,
    deductions: payroll?.deductions || 0,
    netSalary: payroll?.netSalary || 0,
    status: payroll?.status || "Pendiente",
  });

  useEffect(() => {
    // Calculate net salary whenever base salary, bonuses, or deductions change
    const netSalary =
      Number(formData.baseSalary) +
      Number(formData.bonuses) -
      Number(formData.deductions);
    setFormData((prev) => ({ ...prev, netSalary }));
  }, [formData.baseSalary, formData.bonuses, formData.deductions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="employeeId">Empleado</Label>
          <Select
            value={formData.employeeId.toString()}
            onValueChange={(value) =>
              handleSelectChange("employeeId", Number(value))
            }
          >
            <SelectTrigger id="employeeId">
              <SelectValue placeholder="Seleccionar empleado" />
            </SelectTrigger>
            <SelectContent>
              {mockEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="period">Período</Label>
          <Select
            value={formData.period}
            onValueChange={(value) => handleSelectChange("period", value)}
          >
            <SelectTrigger id="period">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="baseSalary">Salario Base</Label>
          <Input
            id="baseSalary"
            name="baseSalary"
            type="number"
            value={formData.baseSalary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bonuses">Bonificaciones</Label>
          <Input
            id="bonuses"
            name="bonuses"
            type="number"
            value={formData.bonuses}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deductions">Deducciones</Label>
          <Input
            id="deductions"
            name="deductions"
            type="number"
            value={formData.deductions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="netSalary">Salario Neto</Label>
          <Input
            id="netSalary"
            name="netSalary"
            type="number"
            value={formData.netSalary}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Pagado">Pagado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Generar Nómina
        </Button>
      </div>
    </form>
  );
}
