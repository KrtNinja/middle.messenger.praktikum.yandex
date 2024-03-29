import template from './profile.tmpl';
import './profile.styles.css';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';
import router from '../../router';
import authController from '../../core/controllers/auth/Auth.controller';
import { globalStore } from '../../store/global.store';
import avatar from '../../../public/images/avatar.png';
import userController from '../../core/controllers/user/User.controller';
import { snackbar } from '../../services/snackbar';
import { apiConfig } from '../../core/contants/Api';

const props = {
  srcImg: avatar,
  first_name: 'Иван',
  infoList: [
    { key: 'email', name: 'Почта', value: 'pochta@yandex.ru' },
    { key: 'login', name: 'Логин', value: 'ivanovivan' },
    { key: 'first_name', name: 'Имя', value: 'Иван' },
    { key: 'second_name', name: 'Фамилия', value: 'Иванов' },
    { key: 'display_name', name: 'Никнейм', value: 'BigVano' },
    { key: 'phone', name: 'Телефон', value: '+7 (903) 622 70 01' }
  ]
};

class Profile extends Block {
  constructor() {
    super('div', {
      change_data_button: new LWButton({
        buttonText: 'Изменить данные',
        variant: 'text',
        color: 'primary',
        events: { click: () => router.go('/profile/edit') }
      }),
      change_password_button: new LWButton({
        buttonText: 'Изменить пароль',
        variant: 'text',
        color: 'primary',
        events: { click: () => router.go('/profile/password') }
      }),
      exit_button: new LWButton({
        buttonText: 'Выйти',
        variant: 'text',
        color: 'error',
        events: { click: () => this.logout() }
      }),
      events: {
        change: (evt: InputEvent) => {
          const { files }: { files: FileList | null } = evt.target as HTMLInputElement;
          if (!files?.length) {
            return;
          }
          const [file] = files;
          this.uploadFile(file).catch();
        }
      },
      ...props
    });
  }

  render() {
    return template;
  }

  private async uploadFile(file: File) {
    const formData = new FormData();
    formData.set('avatar', file);
    const data = await userController.changeUserAvatar(formData);

    if (!data) {
      return;
    }

    snackbar.open('Аватар успешно загружен на сервер', 'success');
    this.updatePropValue('srcImg', `${apiConfig.RESOURCES}${data.avatar}`);
  }

  dispatchMountComponent() {
    super.dispatchMountComponent();

    globalStore.subscribe(async ({ user }) => {
      if (user?.avatar) {
        this.updatePropValue('srcImg', `${apiConfig.RESOURCES}${user.avatar}`);
      }

      this.setProps({
        first_name: user?.first_name,
        infoList: this.getProps().infoList.map(
          (item: { key: string; name: string; value: string }) => ({
            ...item,
            value: user?.[item.key] || ''
          })
        )
      });
    });
  }

  private async logout() {
    const data = await authController.logout();

    if (!data) {
      return;
    }

    router.go('/login');
  }
}

export default Profile;
