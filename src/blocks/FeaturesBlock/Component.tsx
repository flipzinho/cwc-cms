import React from 'react'

type Feature = {
  icon: string // Classe do ícone (ex: 'ri-heart-line')
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
            <div className="bg-[#F4EFDB] rounded-[16px] p-6 mb-3 flex items-center justify-center w-20 h-20 mx-auto">
              <i className={`${feature.icon} text-4xl text-gray-800`} />
            </div>
            <div className="flex flex-col gap-1 items-center">
              <h3 className="prose prose-h2:text-[#171717] text-lg font-semibold mb-1 block">
                <span className="prose-h2">{feature.title}</span>
              </h3>
              <p className="prose prose-p mb-0">
                <span className="prose-p">{feature.description}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
