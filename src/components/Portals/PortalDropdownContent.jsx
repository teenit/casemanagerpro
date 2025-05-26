import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class PortalDropdownContent extends Component {
  constructor(props) {
    super(props);

    this.internalRef = createRef();
    this.contentRef = props.forwardedRef || this.internalRef;

    this.state = {
      prevSize: { width: 0, height: 0 },
    };

    this.resizeObserver = null;
  }

  componentDidMount() {
    const element = this.contentRef.current;
    if (!element) return;

    this.resizeObserver = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      const { prevSize } = this.state;
      if (width !== prevSize.width || height !== prevSize.height) {
        this.setState({ prevSize: { width, height } });
        // optionally trigger some recalculation if needed
      }
    });

    this.resizeObserver.observe(element);
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  render() {
    const { contentStyle, children, noBackdrop } = this.props;

    return (
      <>
        {!noBackdrop && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 999,
            }}
            onClick={(e) => {
              e.stopPropagation();
              this.props.closeDropdown()
            }}
          />
        )}
        <div
          className="PortalDropdownContent"
          style={{
            zIndex: 1000,
            ...contentStyle,
          }}
          ref={this.contentRef}
        >
          {children}
        </div>
      </>
    );
  }
}

PortalDropdownContent.propTypes = {
  contentStyle: PropTypes.object,
  children: PropTypes.node,
  noBackdrop: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

// Для підтримки рефа, обгортаємо класовий компонент у forwardRef:
const PortalDropdownContentWithRef = React.forwardRef((props, ref) => (
  <PortalDropdownContent {...props} forwardedRef={ref} />
));

export default PortalDropdownContentWithRef;
