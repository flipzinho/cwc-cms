import React from 'react'

type Feature = {
  icon: {
    url: string // URL da imagem
    alt?: string // Texto alternativo (opcional)
  }
  title: string
  description: string
}

type FeaturesBlockProps = {
  features: Feature[]
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ features }) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="bg-[#F4EFDB] rounded-[16px] p-12 mb-4">
              <i className={`${feature.icon} text-4xl text-gray-800`} /> {/* Renderiza o ícone */}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
