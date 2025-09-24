import { ProgressiveBlur } from "./progressive-blur"

const BlurContainer = ({children, className, ...props}: {children: React.ReactNode, className?: string}) => {
  return (
    <div className={`relative  overflow-auto ${className}`} {...props}>
      <div className="">{children}</div>

      <ProgressiveBlur height="50%" position="bottom" />
    </div>
  )
}

export default BlurContainer