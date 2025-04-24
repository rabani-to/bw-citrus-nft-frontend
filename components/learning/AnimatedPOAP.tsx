'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useSpring, animated, to } from 'react-spring'

const AnimatedPOAP = ({
  imageURL,
  className,
  onDoubleClick
}: {
  imageURL: string
  className?: string
  onDoubleClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const [props, set] = useSpring(() => ({
    xyz: [0, 0, 1], // x and y rotation, z scale
    gradientPosition: [50, 50], // Initial gradient position (centered)
    gradientOpacity: 1, // Control gradient opacity
    config: { mass: 5, tension: 350, friction: 40 },
    immediate: true
  }))

  const calcRotationAndGradient = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const xOffset = (x - width / 2) / 20
    const yOffset = -(y - height / 2) / 20 // Negative for intuitive rotation
    const scale = 1.02 // Scale-up on hover

    // Calculate gradient position as percentages
    const gradientX = (x / width) * 100
    const gradientY = (y / height) * 100

    // Opacity logic based on distance from center
    const dx = Math.abs(x - width / 2)
    const dy = Math.abs(y - height / 2)
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)
    const opacity = Math.max(
      0.05,
      Math.min(distanceFromCenter / maxDistance, 1)
    ) // Clamp between 0.05 and 1
    // Opacity logic based on distance from center

    return {
      xyz: [yOffset, xOffset, scale],
      gradientPosition: [gradientX, gradientY],
      gradientOpacity: opacity
    }
  }

  const trans = (x: number, y: number, scale: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${scale})`

  const gradient = (x: number, y: number) =>
    `radial-gradient(circle at ${x}% ${y}%, rgba(0, 255, 255, 0.5), rgba(255, 0, 255, 0.3), rgba(255, 255, 255, 0) 70%)`

  return (
    <animated.div
      onDoubleClick={onDoubleClick}
      tabIndex={-1}
      role='button'
      className={cn(
        'focus:outline-none active:cursor-grabbing',
        'relative cursor-grab size-64 rounded-full border-2 border-black shadow-lemon-action overflow-hidden',
        className
      )}
      style={{
        transform: to(props.xyz, trans)
      }}
      onMouseMove={e => {
        setIsHovered(true)
        const { clientX: x, clientY: y, currentTarget } = e
        const { width, height, left, top } =
          currentTarget.getBoundingClientRect()
        const calc = calcRotationAndGradient(x - left, y - top, width, height)
        set(calc)
      }}
      onMouseLeave={() => {
        set({ xyz: [0, 0, 1], gradientPosition: [50, 50] }) // Reset to center
        setIsHovered(false)
      }}
    >
      <animated.div
        style={{
          background: to(props.gradientPosition, gradient),
          opacity: isHovered ? props.gradientOpacity : 0
        }}
        className='absolute transition-opacity duration-100 inset-0 z-1 pointer-events-none'
      />

      <img
        className='size-full scale-[1.009] pointer-events-none object-cover'
        src={imageURL}
        alt=''
      />
    </animated.div>
  )
}

export default AnimatedPOAP