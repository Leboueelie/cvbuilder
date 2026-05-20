import { Education } from "@/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  educations: Education[];
  setEducations: (educations: Education[]) => void;
};

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {
  const [newEducation, setNewEducation] = useState<Education>({
    school: "",
    degree: "",
    level: "Bac",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: keyof Education,
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setNewEducation({ ...newEducation, [field]: value });
  };

  const handleAddEducation = () => {
    setEducations([...educations, newEducation]);
    setNewEducation({
      school: "",
      degree: "",
      level: "Bac",
      description: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Nom de l'école"
        value={newEducation.school}
        onChange={(e) => handleChange(e, "school")}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        placeholder="Diplôme (ex: Licence Informatique)"
        value={newEducation.degree}
        onChange={(e) => handleChange(e, "degree")}
        className="input input-bordered w-full"
      />

      <select
        value={newEducation.level}
        onChange={(e) => handleChange(e, "level")}
        className="select select-bordered w-full"
      >
        <option value="Bac">Bac</option>
        <option value="Bac+2">Bac+2 (BTS, DUT)</option>
        <option value="Bac+3">Bac+3 (Licence)</option>
        <option value="Master">Master (Bac+5)</option>
        <option value="Doctorat">Doctorat</option>
        <option value="Autre">Autre</option>
      </select>

      <div className="flex gap-4">
        <input
          type="date"
          placeholder="Date de début"
          value={newEducation.startDate}
          onChange={(e) => handleChange(e, "startDate")}
          className="input input-bordered w-full"
        />

        {!newEducation.isCurrent && (
          <input
            type="date"
            placeholder="Date de fin"
            value={newEducation.endDate}
            onChange={(e) => handleChange(e, "endDate")}
            className="input input-bordered w-full"
          />
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={newEducation.isCurrent}
          onChange={(e) => handleChange(e, "isCurrent")}
          className="checkbox checkbox-primary"
        />
        <span className="text-sm">En cours (jusqu'à présent)</span>
      </label>

      <textarea
        placeholder="Description"
        value={newEducation.description}
        onChange={(e) => handleChange(e, "description")}
        className="textarea textarea-bordered w-full"
      />

      <button onClick={handleAddEducation} className="btn btn-primary mt-4">
        Ajouter
        <Plus className="w-4" />
      </button>

      {/* Liste des formations ajoutées */}
      <div className="space-y-2 mt-4">
        {educations.map((edu, index) => (
          <div key={index} className="bg-base-200 p-3 rounded-lg text-sm">
            <div className="font-semibold">
              {edu.degree} ({edu.level})
            </div>
            <div className="text-base-content/70">{edu.school}</div>
            <div className="text-xs text-base-content/50">
              {formatDateDisplay(edu.startDate)} -{" "}
              {edu.isCurrent ? "présent" : formatDateDisplay(edu.endDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Fonction utilitaire pour afficher les dates
function formatDateDisplay(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default EducationForm;
