import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type'
import React from 'react'
import Image from 'next/image'

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

const CVBold: React.FC<Props> = ({ 
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
      className={`w-[950px] h-[1200px] bg-base-100 flex ${download ? 'mb-10' : ''}`}
    >
      {/* BANDE GAUCHE COLORÉE */}
      <div className="w-1/3 bg-primary text-primary-content p-10 flex flex-col">
        {/* PHOTO GRANDE */}
        <div className="w-48 h-48 mx-auto mb-8 rounded-2xl overflow-hidden border-4 border-primary-content/30 rotate-3">
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              width={192}
              height={192}
              className="w-full h-full object-cover -rotate-3"
              alt="Photo"
              onLoad={() => {
                if (typeof file !== 'string') {
                  URL.revokeObjectURL(URL.createObjectURL(file))
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-primary-content/20 flex items-center justify-center -rotate-3">
              <span className="text-4xl">?</span>
            </div>
          )}
        </div>

        {/* CONTACT */}
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-lg border-b-2 border-primary-content/30 pb-2">Contact</h3>
          {personalDetails.email && <p className="text-sm break-all">{personalDetails.email}</p>}
          {personalDetails.phone && <p className="text-sm">{personalDetails.phone}</p>}
          {personalDetails.address && <p className="text-sm">{personalDetails.address}</p>}
        </div>

        {/* COMPÉTENCES */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-lg border-b-2 border-primary-content/30 pb-2 mb-4">Competences</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-primary-content/20 rounded-lg text-sm">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* LANGUES */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-lg border-b-2 border-primary-content/30 pb-2 mb-4">Langues</h3>
            <div className="space-y-2">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{lang.language}</span>
                  <span className="opacity-80">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOISIRS */}
        {hobbies.length > 0 && (
          <div>
            <h3 className="font-bold text-lg border-b-2 border-primary-content/30 pb-2 mb-4">Loisirs</h3>
            <p className="text-sm leading-relaxed">
              {hobbies.map(h => h.name).join(' • ')}
            </p>
          </div>
        )}
      </div>

      {/* CONTENU DROIT */}
      <div className="w-2/3 p-12">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-6xl font-black text-primary mb-4 leading-none">
            {personalDetails.fullName || 'Votre nom'}
          </h1>
          <p className="text-2xl text-base-content/70 font-medium">
            {personalDetails.postSeeking}
          </p>
          {personalDetails.description && (
            <p className="mt-6 text-base-content/80 leading-relaxed border-l-4 border-primary pl-4">
              {personalDetails.description}
            </p>
          )}
        </div>

        {/* EXPÉRIENCES */}
        {experiences.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary text-primary-content rounded-lg flex items-center justify-center text-sm">01</span>
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-base-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                  <p className="text-primary font-medium mb-2">{exp.companyName}</p>
                  <p className="text-sm text-base-content/60 mb-2">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </p>
                  <p className="text-sm text-base-content/80 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FORMATIONS */}
        {educations.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary text-primary-content rounded-lg flex items-center justify-center text-sm">02</span>
              Formation
            </h2>
            <div className="space-y-6">
              {educations.map((edu, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-base-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="font-bold text-lg">{edu.degree}</h3>
                  <p className="text-primary font-medium mb-2">{edu.school}</p>
                  <p className="text-sm text-base-content/60">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default CVBold