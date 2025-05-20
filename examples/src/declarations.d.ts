declare module '*.module.css' {
  const content: { [className: string]: string }
  export = content
}


type Intersection<T, K> = T & Omit<K, keyof T>
