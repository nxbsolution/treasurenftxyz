// import React, { useRef, useState } from 'react'
// import { Button } from "@/components/ui/button"

// interface FileUploadProps {
//   onFileSelect: (file: File) => void
// }

// export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
//   const [fileName, setFileName] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       setFileName(file.name)
//       onFileSelect(file)
//     }
//   }

//   const handleClick = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <div className="flex items-center space-x-2">
//       <Button type="button" onClick={handleClick}>
//         Choose File
//       </Button>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//       />
//       {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
//     </div>
//   )
// }

