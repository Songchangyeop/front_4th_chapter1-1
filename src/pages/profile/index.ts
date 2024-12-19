import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { ProfileForm } from "./_components/ProfileForm";

export class ProfilePage {
  private container: HTMLElement;
  private footer: Footer;
  private header: Header;
  private profileForm: ProfileForm;

  constructor(container: HTMLElement) {
    this.container = container;

    this.profileForm = new ProfileForm(this.container);
    this.footer = new Footer();
    this.header = new Header(this.container);
  }

  render() {
    return `
      <div id="profile" class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${this.header.render()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
            ${this.profileForm.render()}
            </div>
          </main>
          ${this.footer.render()}
        </div>
      </div>
  `;
  }
}
