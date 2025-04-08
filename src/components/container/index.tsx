import { ComponentPropsWithoutRef, ElementType } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const containerVariants = cva('container mx-auto px-5', {
    defaultVariants: {
        size: 'lg',
    },
    variants: {
        size: {
            lg: 'max-w-7xl',
            md: 'max-w-6xl',
            sm: 'max-w-5xl',
            xl: 'max-w-8xl',
        },
    },
});

type ContainerProps<T extends ElementType = 'div'> = {
    as?: T;
} & ComponentPropsWithoutRef<T> &
    VariantProps<typeof containerVariants>;

function Container<T extends ElementType = 'button'>({
    as,
    children,
    className,
    size,
    ...rest
}: ContainerProps<T>) {
    const Component = as || 'div';

    return (
        <Component
            {...rest}
            className={containerVariants({
                className,
                size,
            })}
        >
            {children}
        </Component>
    );
}

export { Container };
