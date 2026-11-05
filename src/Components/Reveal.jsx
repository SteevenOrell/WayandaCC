import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

/** Fade/slide content in once when it scrolls into view. No motion if the user prefers reduced motion. */
export function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Headline whose lines slide up from behind a mask on mount. */
export function MaskedLines({ lines, as = 'h1', id, className, delay = 0.15 }) {
  const reduce = useReducedMotion();
  const Heading = as;
  return (
    <Heading id={id} className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={line}>
          {reduce ? (
            <span>{line}</span>
          ) : (
            <motion.span
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.1 }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Heading>
  );
}
