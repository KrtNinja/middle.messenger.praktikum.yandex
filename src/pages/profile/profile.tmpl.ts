import Handlebars from 'handlebars';

const template = `{{#>Layout}}
  {{>LWBackPanel }}
  <div class='profile'>
    <div class='profile__avatar'>
      <div class='profile__avatar-icon'>
        <input class='profile__avatar-icon_input' id='avatar' name='avatar' type='file' accept='image/*'>
        <img src='{{ srcImg }}' width='150' height='150' alt='Аватар' />
      </div>
      <div class='profile__avatar-name'>
        <p>{{first_name}}</p>
      </div>
    </div>
    <div class='profile__info-list'>
      <ul class=''>
        {{#each infoList}}
          {{#if @index}}
          <li class='divider'>
          {{/if}}
          <li>
            <p>{{this.name}}</p>
            <p class='grey--text'>{{this.value}}</p>
          </li>
        {{/each}}
      </ul>
    </div>
    <div class='profile__actions'>
      {{{ change_data_button }}}
      {{{ change_password_button }}}
      {{{ exit_button }}}
    </div>
  </div>
{{/Layout}}
`;

export default Handlebars.compile(template);
