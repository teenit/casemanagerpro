import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PortalDropdown from "./PortalDropdown";
import { Button } from '@mui/material'
import Icon from '../elements/Icons/Icon';

class ActionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        };
        this.togglerRef = React.createRef();
    }

    // Метод для обробки кліку на головну кнопку меню
    onMenuClick = (e) => {
        e.stopPropagation(); // Зупиняємо спливання події

        // Якщо є onChangeIsOpenStatus, викликаємо його з протилежним значенням
        if (this.props.onChangeIsOpenStatus) {
            this.props.onChangeIsOpenStatus(!this.state.showMenu);
        }

        this.setState(prevState => ({ showMenu: !prevState.showMenu }));
    };

    // Підготовка даних меню
    prepareData = (menuItems) => {
        // Фільтруємо приховані елементи
        let filteredItems = menuItems.filter(item => item.isHidden !== true);

        // Функція для видалення роздільників з початку та кінця масиву
        const removeEdgeDividers = (arr) => {
            let newArr = [...arr]; // Створюємо копію, щоб не змінювати оригінал

            while (newArr.length > 0 && newArr[0].itemType === 'divider') {
                newArr.shift();
            }

            while (newArr.length > 0 && newArr[newArr.length - 1].itemType === 'divider') {
                newArr.pop();
            }
            return newArr;
        };

        // Функція для видалення подвійних роздільників у середині
        const removeMiddleDividers = (arr) => {
            return arr.filter((item, index) => {
                if (item.itemType === 'divider') {
                    // Якщо поточний елемент - роздільник і попередній теж роздільник, видаляємо його
                    if (index > 0 && arr[index - 1].itemType === 'divider') {
                        return false;
                    }
                }
                return true;
            });
        };

        let processedItems = removeEdgeDividers(filteredItems);
        processedItems = removeMiddleDividers(processedItems);

        return processedItems;
    };

    // Метод для закриття меню, передається до ActionMenuItem
    closeMenu = () => {
        if (this.props.onChangeIsOpenStatus) {
            this.props.onChangeIsOpenStatus(false); // Закриваємо меню
        }
        this.setState({ showMenu: false });
    };

    render() {
        const { menuItems, addClass, iconMenu, activeMenu } = this.props;
        const { showMenu } = this.state;

        const filteredAndPreparedMenuItems = this.prepareData(menuItems);

        return (
            <div
                className={`${addClass} ActionMenu absolute-menu-toggle-container ${showMenu ? "active" : ""}`}
                tabIndex={0}
                ref={this.togglerRef}
                style={{
                  position: 'relative'
                }}
            >
                <div className="ActionMenu-icon"
                     onClick={(e) => {
                         e?.stopPropagation();
                         if (this.props.onChangeIsOpenStatus) {
                             this.props.onChangeIsOpenStatus(true); // Відкриваємо при кліку на іконку
                         }
                         this.setState({ showMenu: true });
                     }}
                >
                    {filteredAndPreparedMenuItems.length > 0 && <Icon icon={'menu-list'} />}
                </div>

                {/* PortalDropdown відображається, якщо showMenu або activeMenu (з пропсів) true */}
                {(showMenu || activeMenu) && filteredAndPreparedMenuItems.length > 0 && (
                    <PortalDropdown
                        togglerRef={this.togglerRef} // Передаємо ref для позиціонування
                        closeDropdown={this.closeMenu} // Метод для закриття
                        contentSpacing={0}
                        openDirection="auto" // Вказано напрямок
                        stickPosition="right" // Вказано позицію прилипання
                        hideOnScroll={true} // Можливо, варто використовувати проп з ActionMenu
                        noBackdrop={false} // Додано проп noBackdrop для Backdrop
                        isOpen={showMenu}
                        disableScroll={true}
                    >
                        <div className="ActionMenu-container">
                            {filteredAndPreparedMenuItems.map((item, i) => (
                                <ActionMenuItem
                                    key={`${i}-${item.title || item.itemType}`} // Кращий key
                                    closeMenu={this.closeMenu} // Метод для закриття меню
                                    {...item} // Передаємо всі інші пропси елемента меню
                                />
                            ))}
                        </div>
                    </PortalDropdown>
                )}
            </div>
        );
    }
}

// defaultProps для ActionMenu
ActionMenu.defaultProps = {
    iconMenu: 'ifo ifo-menu',
    addClass: '',
    menuItems: [], // Додаємо, якщо не завжди передається
    activeMenu: false, // Якщо activeMenu може бути пропом
    onChangeIsOpenStatus: null, // Додаємо, якщо це опціональний callback
};


// Підключення до Redux
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ActionMenu);


// Компонент ActionMenuItem (якщо він є в тому ж файлі або вам потрібно його форматування)
class ActionMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}; // Залиште порожнім, якщо немає локального стану
    }

    render() {
        const { icon, title, click, closeMenu, addClass, disabled, color, itemType } = this.props;

        return (
            <>
                {itemType === 'menuItem' && (
                    <Button
                        className={addClass + " btn-with-icon"}
                        color={color}
                        disabled={disabled}
                        variant='text'
                        size='small'
                        sx={{
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                        }}
                        onClick={() => {
                            if (!disabled) {
                                if (click) { // Перевірка, чи функція click існує
                                    click();
                                }
                                closeMenu(); // Закриваємо меню після кліку
                            }
                        }}
                    ><Icon addClass='icon' icon={icon}/> {title}</Button>
                )}
                {itemType === 'divider' && (
                    <div className="divider">
                        <div className="divider-line"></div>
                    </div>
                )}
            </>
        );
    }
}

// defaultProps для ActionMenuItem
ActionMenuItem.defaultProps = {
    icon: '',
    title: '',
    click: () => {}, // Порожня функція за замовчуванням
    addClass: 'w100',
    color: 'primary',
    itemType: 'menuItem',
    disabled: false,
    isHidden: false, // Зображення показує isHidden в defaultProps
};