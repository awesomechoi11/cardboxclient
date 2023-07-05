import MyIconButton from "../Form/MyIconButton";
import { MyHoverTooltip } from "../Tooltip/MyClickTooltip";

export default function BackToTopButton() {
  return (
    <div className="absolute top-[1457rem] bottom-[75rem] left-[230rem] track">
      <div
        className="sticky top-[calc(100vh - 256rem)]"
        onClick={() => {
          document
            .getElementById("app")
            .scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <MyHoverTooltip
          TooltipContent={<div className="nowrap">Scroll To Top</div>}
          TriggerContent={
            <MyIconButton>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.6588 20.4933C23.2431 20.857 22.6114 20.8149 22.2477 20.3992L16.0002 13.2593L9.75282 20.3992C9.38914 20.8149 8.75738 20.857 8.34174 20.4933C7.9261 20.1296 7.88399 19.4978 8.24767 19.0822L14.8714 11.5122C15.469 10.8293 16.5315 10.8293 17.1291 11.5122L23.7528 19.0822C24.1165 19.4978 24.0744 20.1296 23.6588 20.4933Z"
                  fill="#674433"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.6588 20.4933C23.2431 20.857 22.6114 20.8149 22.2477 20.3992L16.0002 13.2593L9.75282 20.3992C9.38914 20.8149 8.75738 20.857 8.34174 20.4933C7.9261 20.1296 7.88399 19.4978 8.24767 19.0822L14.8714 11.5122C15.469 10.8293 16.5315 10.8293 17.1291 11.5122L23.7528 19.0822C24.1165 19.4978 24.0744 20.1296 23.6588 20.4933Z"
                  fill="#674433"
                />
              </svg>
            </MyIconButton>
          }
        />
      </div>
    </div>
  );
}
