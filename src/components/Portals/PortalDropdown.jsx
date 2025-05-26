import React from 'react';
import PropTypes from 'prop-types';
import PortalDropdownContent from './PortalDropdownContent';
import { createPortal } from 'react-dom';
import { getScaledProp, getScaledSize } from '../../utils/documentScaling';

class PortalDropdown extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        closeDropdown: PropTypes.func.isRequired,
        contentSpacing: PropTypes.number,
        togglerRef: PropTypes.object.isRequired,
        contentWidth: PropTypes.bool,
        hideOnScroll: PropTypes.bool,
        noBackdrop: PropTypes.bool,
        openDirection: PropTypes.oneOf(['top', 'bottom', 'left', 'right','auto']),
        stickPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
        contentSpacing: 8,
        contentWidth: false,
        hideOnScroll: false,
        noBackdrop: false,
        openDirection: 'bottom',
        stickPosition: 'right',
    };

    constructor(props) {
        super(props);
        this.state = {
            contentStyle: {
                opacity: '0',
                position: 'fixed',
                top: 0,
                left: 0,
            },
            currentTop: null,
            currentLeft: null,
        };

        this.onGlobalScroll = this.onGlobalScroll.bind(this);
        this.recalculateContentStyle = this.recalculateContentStyle.bind(this);
        this.contentRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.hideOnScroll) {
            window.addEventListener('scroll', this.onGlobalScroll, true);
        }

        if (this.props.isOpen) {
            const rect = this.contentRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
            this.recalculateContentStyle(rect);
        }
    }

    componentDidUpdate(prevProps) {
        const { isOpen, contentSpacing, togglerRef, openDirection, stickPosition, contentWidth, hideOnScroll } = this.props;

        const positionPropsChanged = (
            contentSpacing !== prevProps.contentSpacing ||
            togglerRef !== prevProps.togglerRef ||
            openDirection !== prevProps.openDirection ||
            stickPosition !== prevProps.stickPosition ||
            contentWidth !== prevProps.contentWidth
        );

        if (isOpen && (!prevProps.isOpen || positionPropsChanged)) {
            const rect = this.contentRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
            this.recalculateContentStyle(rect);
        }

        if (hideOnScroll !== prevProps.hideOnScroll) {
            if (hideOnScroll) {
                window.addEventListener('scroll', this.onGlobalScroll, true);
            } else {
                window.removeEventListener('scroll', this.onGlobalScroll, true);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.hideOnScroll) {
            window.removeEventListener('scroll', this.onGlobalScroll, true);
        }
    }

    onGlobalScroll() {
        const { togglerRef, closeDropdown } = this.props;

        if (!togglerRef?.current) return;

        const boundTo = togglerRef.current.getBoundingClientRect();
        if (
            boundTo.top < 0 ||
            boundTo.left < 0 ||
            boundTo.top > window.innerHeight ||
            boundTo.left > window.innerWidth
        ) {
            window.removeEventListener('scroll', this.onGlobalScroll, true);
            closeDropdown();
        }
    }

 recalculateContentStyle(childBounding) {
    const {
        contentSpacing,
        openDirection,
        stickPosition,
        togglerRef,
        contentWidth,
    } = this.props;

    if (!togglerRef?.current) {
        console.error('PortalDropdown: No toggler ref provided or ref.current is null.');
        return;
    }

    const togglerRect = togglerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    const viewport = window.visualViewport || {
        width: window.innerWidth,
        height: window.innerHeight,
        offsetTop: 0,
        offsetLeft: 0,
    };

    const spacing = getScaledProp(contentSpacing);

    let newStyle = {
        opacity: '1',
        position: 'fixed',
        zIndex: 9999,
    };

    if (contentWidth) {
        newStyle.width = getScaledSize(togglerRect.width);
    }

    // Визначаємо автоматичний напрямок
    let direction = openDirection;
    if (openDirection === 'auto') {
        const spaceBelow = viewport.height - togglerRect.bottom;
        const spaceAbove = togglerRect.top;
        direction = spaceBelow >= childBounding.height + spacing || spaceBelow > spaceAbove ? 'bottom' : 'top';
    }

    // Горизонтальна позиція (stickPosition)
    const horizontalStick = () => {
        if (stickPosition === 'left') return togglerRect.left;
        if (stickPosition === 'right') return togglerRect.right - childBounding.width;
        return togglerRect.left; // fallback
    };

    // Вертикальна позиція (openDirection)
    const verticalPos = () => {
        if (direction === 'top') {
            return togglerRect.top - spacing - childBounding.height;
        } else {
            return togglerRect.bottom + spacing;
        }
    };

    // Обмеження по вертикалі
    let top = verticalPos() + viewport.offsetTop;
    top = Math.max(viewport.offsetTop, Math.min(top, viewport.offsetTop + viewport.height - childBounding.height));

    // Обмеження по горизонталі
    let left = horizontalStick() + viewport.offsetLeft;
    left = Math.max(viewport.offsetLeft, Math.min(left, viewport.offsetLeft + viewport.width - childBounding.width));

    newStyle.top = `${top}px`;
    newStyle.left = `${left}px`;

    // Блокуємо scroll сторінки
    document.body.style.overflow = 'hidden';

    this.setState({
        contentStyle: newStyle,
        currentTop: togglerRect.top,
        currentLeft: togglerRect.left,
    });
}


    render() {
        const { isOpen, closeDropdown, children, noBackdrop } = this.props;

        if (!isOpen) return null;

        return createPortal(
            <PortalDropdownContent
                ref={this.contentRef}
                closeDropdown={closeDropdown}
                contentStyle={this.state.contentStyle}
                noBackdrop={noBackdrop}
            >
                {children}
            </PortalDropdownContent>,
            document.body
        );
    }
}

export default PortalDropdown;
