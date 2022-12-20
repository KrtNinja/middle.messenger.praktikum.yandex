import Handlebars from 'handlebars';

const template = `{{#>Layout}}
  {{>LWBackPanel }}
  <div class='profile'>
    <div class='profile__avatar'>
      <div class='profile__avatar-icon'>
        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
          <path fill-rule='evenodd' clip-rule='evenodd'
                d='M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z'
                fill='#29B327' />
        </svg>
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
      {{>LWButton variant='text' color='primary' buttonText='Изменить данные' }}
      {{>LWButton variant='text' color='primary' buttonText='Изменить пароль' }}
      {{>LWButton
        variant='text'
        color='error'
        buttonText='Выйти'
        onClick='location.href = "/login"'
      }}
    </div>
  </div>
{{/Layout}}
`;

export default Handlebars.compile(template);
