import { isTestSuiteActive } from "../../support/page_objects/projectConstants";

export const genTest = (type, xcdb) => {
  if (!isTestSuiteActive(type, xcdb)) return;

  describe(`${type.toUpperCase()} Table/view drag-drop reorder`, () => {
    function validateTreeField(index, tblName) {
      cy.get(`:nth-child(${index}) > .v-list-item__title > .caption`)
        .contains(tblName)
        .should("exist");
    }

    /*
      Original order of list items
      Actor, Address, Category, City, Country, Customer, FIlm, FilmText, Language, Payment, Rental Staff
      ActorInfo, CustomerList, FilmList, NiceButSlowerFilmList, SalesByFilmCategory, SalesByStore, StaffList
    */

    it(`Table & View list, Drag/drop`, () => {
      // expand tree-view menu
      cy.get(".nc-project-tree")
        .find(".v-list-item__title:contains(Tables)", { timeout: 10000 })
        .should("exist")
        .first()
        .click({ force: true });

      validateTreeField(1, "Actor");

      // move Actor field down, above Staff (drag, drop)
      cy.get(".nc-child-draggable-icon-Actor").drag(
        ".nc-child-draggable-icon-Staff"
      );

      validateTreeField(12, "Actor");

      // move ActorInfo (View) field up to first place (drag, drop)
      cy.get(".nc-child-draggable-icon-ActorInfo").drag(
        ".nc-child-draggable-icon-Address"
      );

      validateTreeField(1, "ActorInfo");
      validateTreeField(2, "Address");
      validateTreeField(13, "Actor");

      // restore ActorInfo field (drag, drop)
      cy.get(".nc-child-draggable-icon-ActorInfo").drag(
        ".nc-child-draggable-icon-Actor"
      );

      // restore Actor field (drag, drop)
      cy.get(".nc-child-draggable-icon-Actor").drag(
        ".nc-child-draggable-icon-Address"
      );

      validateTreeField(1, "Actor");
      validateTreeField(2, "Address");
      validateTreeField(12, "Staff");
      validateTreeField(13, "ActorInfo");
      validateTreeField(14, "CustomerList");

      // undo project-tree expand operation
      cy.get(".nc-project-tree")
        .find(".v-list-item__title:contains(Tables)", { timeout: 10000 })
        .should("exist")
        .first()
        .click({ force: true });
    });
  });
};

/**
 * @copyright Copyright (c) 2021, Xgene Cloud Ltd
 *
 * @author Pranav C Balan <pranavxc@gmail.com>
 * @author Raju Udava <sivadstala@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
