/**
  * <Toolbar />
  */

import React from 'react';
import ToolbarItem from './toolbar-draggable-item';
import ID from './UUID';
import store from './stores/store';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    const items = (this.props.items) ? this.props.items : this._defaultItems();
    this.state = {
      items,
    };
    store.subscribe(state => this.setState({ store: state }));
  }

  static _defaultItemOptions(element) {
    switch (element) {
      case 'Dropdown':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `dropdown_option_${ID.uuid()}` },
        ];
      case 'Tags':
        return [
          { value: 'place_holder_tag_1', text: 'Place holder tag 1', key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_2', text: 'Place holder tag 2', key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_3', text: 'Place holder tag 3', key: `tags_option_${ID.uuid()}` },
        ];
      case 'Checkboxes':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `checkboxes_option_${ID.uuid()}` },
        ];
      case 'RadioButtons':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `radiobuttons_option_${ID.uuid()}` },
        ];
      default:
        return [];
    }
  }

  _defaultItems() {
    return [
      {
        key: 'Header',
        name: 'Header Text',
        icon: 'fa fa-header',
        static: true,
        content: 'Placeholder Text...',
      }
    ];
  }

  create(item) {
    const elementOptions = {
      id: ID.uuid(),
      element: item.key,
      text: item.name,
      static: item.static,
      required: false,
    };

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) { elementOptions.canHaveAnswer = item.canHaveAnswer; }

    if (item.canReadOnly) { elementOptions.readOnly = false; }

    if (item.canDefaultToday) { elementOptions.defaultToday = false; }

    if (item.content) { elementOptions.content = item.content; }

    if (item.href) { elementOptions.href = item.href; }

    elementOptions.canHavePageBreakBefore = item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;

    if (item.key === 'Image') {
      elementOptions.src = item.src;
    }

    if (item.key === 'DatePicker') {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
    }

    if (item.key === 'Download') {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.key === 'Range') {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.defaultValue) { elementOptions.defaultValue = item.defaultValue; }

    if (item.field_name) { elementOptions.field_name = item.field_name + ID.uuid(); }

    if (item.label) { elementOptions.label = item.label; }

    if (item.options) {
      elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element);
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch('create', this.create(item));
  }

  render() {
    return (
      <div className="react-form-builder-toolbar pull-right">
        <h4>Toolbox</h4>
        <ul>
          {
            this.state.items.map((item) => (<ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />))
          }
        </ul>
      </div>
    );
  }
}
