"use client"
import { Eye, RotateCw, Save, ChevronDown, Download, ZoomIn, ZoomOut, User, Briefcase, GraduationCap, Globe, Star, Target } from "lucide-react";
import Image from "next/image";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from "@/type";
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset } from "@/presets";
import CVPreview from "./components/CVPreview";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import LanguageForm from "./components/LanguageForm";
import SkillForm from "./components/SkillForm";
import HobbyForm from "./components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti"

export default function Home() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>('cupcake')
  const [zoom, setZoom] = useState<number>(50)
  const [experiences, setExperience] = useState<Experience[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [openSection, setOpenSection] = useState<string | null>('personal')

  useEffect(() => {
    const defaultImageUrl = '/profile.jpg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.jpg", { type: blob.type })
        setFile(defaultFile)
      })
  }, [])

  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
    "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
    "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
    "night", "coffee", "winter", "dim", "nord", "sunset",
  ]

  const handleResetPersonalDetails = () => setPersonalDetails({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    photoUrl: '',
    postSeeking: '',
    description: ''
  })

  const handleResetExperiences = () => setExperience([])
  const handleResetEducations = () => setEducations([])
  const handleResetLanguages = () => setLanguages([])
  const handleResetSkills = () => setSkills([])
  const handleResetHobbies = () => setHobbies([]);

  const cvPreviewRef = useRef(null)

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
        })
        const imgData = canvas.toDataURL('image/png')

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: 'mm',
          format: "A4"
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`cv-${personalDetails.fullName || 'sans-nom'}.pdf`)

        const modal = document.getElementById('pdf_modal') as HTMLDialogElement
        if (modal) modal.close()

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999
        })
      } catch (error) {
        console.error('Erreur lors de la generation du PDF :', error);
      }
    }
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-base-200 border-b border-base-300 px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold italic">
          CV<span className="text-primary">Builder</span>
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`btn btn-sm ${activeTab === 'edit' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Editer
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`btn btn-sm ${activeTab === 'preview' ? 'btn-primary' : 'btn-ghost'}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const MobileAccordionItem = ({ 
    title, 
    icon: Icon, 
    sectionKey, 
    children, 
    onReset 
  }: { 
    title: string, 
    icon: React.ElementType, 
    sectionKey: string, 
    children: React.ReactNode,
    onReset?: () => void
  }) => (
    <div className="bg-base-100 rounded-xl overflow-hidden shadow-sm border border-base-300 mb-3">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-4 py-4 flex items-center justify-between bg-gradient-to-r from-base-100 to-base-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {onReset && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onReset()
              }}
              className="p-2 hover:bg-base-300 rounded-full transition-colors"
            >
              <RotateCw className="w-4 h-4 text-base-content/60" />
            </button>
          )}
          <ChevronDown 
            className={`w-5 h-5 transition-transform ${openSection === sectionKey ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>
      {openSection === sectionKey && (
        <div className="p-4 border-t border-base-300">
          {children}
        </div>
      )}
    </div>
  )

  const MobileEditView = () => (
    <div className="lg:hidden pt-20 pb-6 px-4 space-y-4 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex gap-2 mb-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="select select-bordered select-sm flex-1"
        >
          {themes.map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
        <button 
          onClick={() => (document.getElementById('pdf_modal') as HTMLDialogElement).showModal()}
          className="btn btn-primary btn-sm"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      <MobileAccordionItem 
        title="Informations personnelles" 
        icon={User}
        sectionKey="personal"
        onReset={handleResetPersonalDetails}
      >
        <PersonalDetailsForm
          personalDetails={personalDetails}
          setPersonalDetails={setPersonalDetails}
          setFile={setFile}
        />
      </MobileAccordionItem>

      <MobileAccordionItem 
        title="Experiences professionnelles" 
        icon={Briefcase}
        sectionKey="experiences"
        onReset={handleResetExperiences}
      >
        <ExperienceForm experience={experiences} setExperiences={setExperience} />
      </MobileAccordionItem>

      <MobileAccordionItem 
        title="Formations" 
        icon={GraduationCap}
        sectionKey="educations"
        onReset={handleResetEducations}
      >
        <EducationForm educations={educations} setEducations={setEducations} />
      </MobileAccordionItem>

      <MobileAccordionItem 
        title="Langues" 
        icon={Globe}
        sectionKey="languages"
        onReset={handleResetLanguages}
      >
        <LanguageForm languages={languages} setLanguages={setLanguages} />
      </MobileAccordionItem>

      <div className="grid grid-cols-2 gap-3">
        <MobileAccordionItem 
          title="Competences" 
          icon={Star}
          sectionKey="skills"
          onReset={handleResetSkills}
        >
          <SkillForm skills={skills} setSkills={setSkills} />
        </MobileAccordionItem>

        <MobileAccordionItem 
          title="Loisirs" 
          icon={Target}
          sectionKey="hobbies"
          onReset={handleResetHobbies}
        >
          <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
        </MobileAccordionItem>
      </div>
    </div>
  )

  const MobilePreviewView = () => (
    <div className="lg:hidden pt-20 pb-6 px-2 h-[calc(100vh-80px)] flex flex-col">
      <div className="bg-base-100 rounded-xl p-3 shadow-lg flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-base">Previsualisation</h2>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setZoom(Math.max(25, zoom - 10))}
              className="btn btn-ghost btn-xs btn-circle"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-xs font-mono w-10 text-center">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(100, zoom + 10))}
              className="btn btn-ghost btn-xs btn-circle"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto bg-base-200 rounded-lg relative">
          <div 
            className="absolute left-1/2 top-0"
            style={{ 
              transform: `translateX(-50%) scale(${zoom / 100})`,
              transformOrigin: 'top center',
              width: '950px'
            }}
          >
            <CVPreview
              personalDetails={personalDetails}
              file={file}
              theme={theme}
              experiences={experiences}
              educations={educations}
              languages={languages}
              hobbies={hobbies}
              skills={skills}
            />
          </div>
        </div>

        <button 
          onClick={() => (document.getElementById('pdf_modal') as HTMLDialogElement).showModal()}
          className="btn btn-primary w-full mt-3"
        >
          <Download className="w-4 h-4 mr-2" />
          Telecharger mon CV
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div className="lg:hidden">
        <MobileHeader />
        {activeTab === 'edit' ? <MobileEditView /> : <MobilePreviewView />}
      </div>

      <div className="hidden lg:block">
        <section className="flex items-center h-screen">
          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollbar">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold italic">
                CV<span className="text-primary">Builder</span>
              </h1>
              <button className="btn btn-primary" onClick={() => (document.getElementById('pdf_modal') as HTMLDialogElement).showModal()}>
                Previsualiser
                <Eye className="w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Qui etes-vous ?</h1>
                <button onClick={handleResetPersonalDetails} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <PersonalDetailsForm personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} setFile={setFile} />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Experiences</h1>
                <button onClick={handleResetExperiences} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <ExperienceForm experience={experiences} setExperiences={setExperience} />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Educations</h1>
                <button onClick={handleResetEducations} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <EducationForm educations={educations} setEducations={setEducations} />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Langues</h1>
                <button onClick={handleResetLanguages} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <LanguageForm languages={languages} setLanguages={setLanguages} />

              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Competences</h1>
                    <button onClick={handleResetSkills} className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>
                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Loisirs</h1>
                    <button onClick={handleResetHobbies} className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-primary"
              />
              <p className="ml-4 text-sm text-primary">{zoom}%</p>
            </div>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="select select-bordered fixed z-[9999] select-sm top-12 right-5"
            >
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>{themeName}</option>
              ))}
            </select>

            <div className="flex justify-center items-center" style={{ transform: `scale(${zoom / 200})` }}>
              <CVPreview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
              />
            </div>
          </div>
        </section>

        <dialog id="pdf_modal" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
            </form>
            <div className="mt-5">
              <div className="flex justify-end mb-5">
                <button onClick={handleDownloadPdf} className="btn btn-primary">
                  Telecharger
                  <Save className="w-4" />
                </button>
              </div>
              <div className="w-full max-x-full overflow-auto">
                <div className="w-full max-w-full flex justify-center items-center">
                  <CVPreview
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={cvPreviewRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}