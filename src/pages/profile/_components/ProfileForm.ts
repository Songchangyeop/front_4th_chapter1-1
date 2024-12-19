import { UserStore } from "../../../store/userStore";
import { UserInfoType } from "../../../utils/userPreference";

export class ProfileForm {
  private container: HTMLElement;
  private userInfo: UserInfoType | null;
  private form: HTMLFormElement;
  private isEventAttached: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.userInfo = UserStore.state.userInfo;

    this.form = document.createElement("form");
    this.form.id = "profile-form";

    UserStore.addObserver({
      update: (state) => {
        this.userInfo = state.userInfo;

        const form = this.container.querySelector(
          "#profile-form",
        ) as HTMLElement;

        if (form) {
          this.render();
          this.attachEventListeners();
        }
      },
    });

    this.attachEventListeners();
  }

  render() {
    this.form.innerHTML = `
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
            >사용자 이름</label
          >
          <input
            type="text"
            id="username"
            name="username"
            value="${this.userInfo?.username ?? ""}"
            class="w-full p-2 border rounded"
          />
          </div>
          <div class="mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
              >이메일</label
            >
            <input
              type="email"
              id="email"
              name="email"
              value="${this.userInfo?.email ?? ""}"
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-6">
            <label
              for="bio"
              class="block text-gray-700 text-sm font-bold mb-2"
              >자기소개</label
            >
            <textarea
              id="bio"
              name="bio"
              rows="4"
              class="w-full p-2 border rounded"
            >${this.userInfo?.bio ?? ""}</textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded font-bold"
          >
            프로필 업데이트
          </button>
  `;

    return this.form.outerHTML;
  }

  attachEventListeners() {
    if (!this.isEventAttached) {
      this.container.addEventListener("submit", this.handleSubmit);
      this.isEventAttached = true;
    }
  }

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (
      event.target instanceof HTMLFormElement &&
      event.target.id === "profile-form"
    ) {
      const username = event.target.querySelector(
        "#username",
      ) as HTMLInputElement;

      const email = event.target.querySelector("#email") as HTMLInputElement;

      const bio = event.target.querySelector("#bio") as HTMLInputElement;

      UserStore.actions.useSetAllUserInfo({
        username: username.value,
        email: email.value,
        bio: bio.value,
      });
    }
  }
}
