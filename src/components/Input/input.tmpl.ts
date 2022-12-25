import Handlebars from 'handlebars';

const template = `<div class='LWInput'>
  <label class='subtitle grey--text'>
    {{label}}
    <input
      class='LWInput__input {{inputClasses}}'
      type='{{type}}'
      value='{{value}}'
      name='{{name}}'
      placeholder='{{placeholder}}'
    />
  </label>
  <p class='subtitle error--text'>{{errorMessage}}</p>
</div>`;

export default Handlebars.compile(template);
