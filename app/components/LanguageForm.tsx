import { Language } from "@/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  languages: Language[];
  setLanguages: (languages: Language[]) => void;
};

const LanguageForm: React.FC<Props> = ({ languages, setLanguages }) => {
  const [newLanguage, setNewLanguage] = useState<Language>({
    language: "",
    proficiency: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Language,
  ) => {
    setNewLanguage({ ...newLanguage, [field]: e.target.value });
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, newLanguage]);
    setNewLanguage({
      language: "",
      proficiency: "",
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Langue"
        value={newLanguage.language}
        onChange={(e) => handleChange(e, "language")}
        className="input input-bordered w-full"
      />
      <select
        value={newLanguage.proficiency}
        onChange={(e) => handleChange(e, "proficiency")}
        className="select select-bordered w-full"
      >
        <option value="">Sélectionner la maîtrise</option>
        <option value="Debutant">Débutant</option>
        <option value="Intermediaire">Intermédiaire</option>
        <option value="Avance">Avancé</option>
      </select>

      <button onClick={handleAddLanguage} className="btn btn-primary mt-4">
        Ajouter
        <Plus className="w-4" />
      </button>
    </div>
  );
};

export default LanguageForm;
