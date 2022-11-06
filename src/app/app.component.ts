import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
})
export class AppComponent {
  constructor() {}
}
