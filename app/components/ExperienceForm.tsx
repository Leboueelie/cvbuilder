import { Experience } from "@/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  experience: Experience[];
  setExperiences: (experience: Experience[]) => void;
};

const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
  const [newExperience, setNewExperience] = useState<Experience>({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Experience,
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setNewExperience({ ...newExperience, [field]: value });
  };

  const handleAddExperience = () => {
    setExperiences([...experience, newExperience]);
    setNewExperience({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Poste occupé"
          value={newExperience.jobTitle}
          onChange={(e) => handleChange(e, "jobTitle")}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Entreprise"
          value={newExperience.companyName}
          onChange={(e) => handleChange(e, "companyName")}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex gap-4">
        <input
          type="date"
          placeholder="Date de début"
          value={newExperience.startDate}
          onChange={(e) => handleChange(e, "startDate")}
          className="input input-bordered w-full"
        />

        {!newExperience.isCurrent && (
          <input
            type="date"
            placeholder="Date de fin"
            value={newExperience.endDate}
            onChange={(e) => handleChange(e, "endDate")}
            className="input input-bordered w-full"
          />
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={newExperience.isCurrent}
          onChange={(e) => handleChange(e, "isCurrent")}
          className="checkbox checkbox-primary"
        />
        <span className="text-sm">En poste actuellement (jusqu'à présent)</span>
      </label>

      <textarea
        placeholder="Description des missions"
        value={newExperience.description}
        onChange={(e) => handleChange(e, "description")}
        className="textarea textarea-bordered w-full"
      />

      <button onClick={handleAddExperience} className="btn btn-primary mt-4">
        Ajouter
        <Plus className="w-4" />
      </button>

      {/* Liste des expériences ajoutées */}
      <div className="space-y-2 mt-4">
        {experience.map((exp, index) => (
          <div key={index} className="bg-base-200 p-3 rounded-lg text-sm">
            <div className="font-semibold">{exp.jobTitle}</div>
            <div className="text-base-content/70">{exp.companyName}</div>
            <div className="text-xs text-base-content/50">
              {formatDateDisplay(exp.startDate)} -{" "}
              {exp.isCurrent ? "présent" : formatDateDisplay(exp.endDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function formatDateDisplay(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default ExperienceForm;
