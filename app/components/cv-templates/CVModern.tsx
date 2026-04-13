import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type'
import React from 'react'
import Image from 'next/image'
import { BriefcaseBusiness, GraduationCap, Mail, MapPin, Phone, Star, Calendar } from 'lucide-react'

interface Props {
  personalDetails: PersonalDetails
  file: File | null
  experiences: Experience[]
  educations: Education[]
  languages: Language[]
  skills: Skill[]
  hobbies: Hobby[]
  download?: boolean
  ref?: React.Ref<HTMLDivElement>
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

const getStarRating = (proficiency: string) => {
  const maxStars = 5
  let filledStars = 0
  switch (proficiency) {
    case 'Debutant': filledStars = 1; break
    case 'Intermediaire': filledStars = 3; break
    case 'Avance': filledStars = 5; break
    default: filledStars = 0
  }
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => (
        <Star 
          key={i} 
          className={`w-3 h-3 ${i < filledStars ? 'fill-primary text-primary' : 'text-base-300'}`} 
        />
      ))}
    </div>
  )
}

const CVModern: React.FC<Props> = ({ 
  personalDetails, 
  file, 
  experiences, 
  educations, 
  languages, 
  skills, 
  hobbies,
  download,
  ref 
}) => {
  return (
    <div 
      ref={ref} 
      className={`w-[950px] h-[1200px] bg-base-100 flex flex-col ${download ? 'mb-10' : ''}`}
    >
      {/* HEADER HORIZONTAL */}
      <header className="bg-primary text-primary-content p-12 flex items-center gap-8">
        <div className="w-32 h-32 rounded-full border-4 border-primary-content overflow-hidden flex-shrink-0">
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              alt="Photo de profil"
              onLoad={() => {
                if (typeof file !== 'string') {
                  URL.revokeObjectURL(URL.createObjectURL(file))
                }
              }}
            />
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{personalDetails.fullName || 'Votre nom'}</h1>
          <p className="text-xl opacity-90 mb-4">{personalDetails.postSeeking || 'Poste recherche'}</p>
          
          <div className="flex flex-wrap gap-4 text-sm opacity-80">
            {personalDetails.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {personalDetails.email}
              </span>
            )}
            {personalDetails.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> {personalDetails.phone}
              </span>
            )}
            {personalDetails.address && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {personalDetails.address}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* CONTENU */}
      <div className="flex-1 p-12 flex gap-12">
        {/* COLONNE GAUCHE */}
        <div className="w-1/3 space-y-8">
          {personalDetails.description && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary pb-2 mb-4">
                Profil
              </h2>
              <p className="text-sm leading-relaxed text-base-content/80">
                {personalDetails.description}
              </p>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary pb-2 mb-4">
                Competences
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary pb-2 mb-4">
                Langues
              </h2>
              <div className="space-y-2">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{lang.language}</span>
                    {getStarRating(lang.proficiency)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hobbies.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary pb-2 mb-4">
                Loisirs
              </h2>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, i) => (
                  <span key={i} className="text-sm text-base-content/70">
                    {hobby.name}{i < hobbies.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* COLONNE DROITE - TIMELINE */}
        <div className="w-2/3 space-y-8">
          {experiences.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary pb-2 mb-6 flex items-center gap-2">
                <BriefcaseBusiness className="w-5 h-5" />
                Experiences professionnelles
              </h2>
              <div className="relative border-l-2 border-primary/30 ml-3 space-y-6">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-base-100" />
                    
                    <div className="flex items-center gap-2 text-sm text-base-content/60 mb-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </div>
                    
                    <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                    <p className="text-primary font-medium mb-2">{exp.companyName}</p>
                    <p className="text-sm text-base-content/80 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {educations.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary pb-2 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Formations
              </h2>
              <div className="relative border-l-2 border-primary/30 ml-3 space-y-6">
                {educations.map((edu, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-base-100" />
                    
                    <div className="flex items-center gap-2 text-sm text-base-content/60 mb-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                    
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-primary font-medium mb-2">{edu.school}</p>
                    <p className="text-sm text-base-content/80">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default CVModern