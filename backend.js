/*  RuneScape Superheating Calculator is a website that allows a user to
 *  calculate what items to buy to superheat ores in RuneScape.
 *
 *  Copyright (C) 2016 Alejandro Ramos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


// CONSTANTS
var COPPER_ORE = 436;
var TIN_ORE = 438;
var IRON_ORE = 440;
var SILVER_ORE = 442;
var GOLD_ORE = 444;
var MITHRIL_ORE = 447;
var ADAMANT_ORE = 449;
var RUNE_ORE = 451;

var COAL = 453;

var BRONZE_BAR = 2349;
var IRON_BAR = 2351;
var SILVER_BAR = 2355;
var STEEL_BAR = 2353;
var GOLD_BAR = 2357;
var MITHRIL_BAR = 2359;
var ADAMANT_BAR = 2361;
var RUNE_BAR = 2363;

var NATURE_RUNE = 561;
function assignValues() {
    // resets for when the calculator is used multiple times without refreshing
    resetShownValues();
    var totalBudget = $("#totalBudget").val();
    var maxTime = $("#maxTime").val();

    totalBudget = totalBudget.replace(/\D/g,'');
    if (totalBudget.length <= 0) {
        alert("Please enter a budget to continue");
        return;
    }

    maxTime = maxTime.replace(/\D/g,'');
    if (maxTime.length <= 0) {
        alert("Please enter a budget to continue");
        return;
    }

    switch($("#barType :selected").val()) {
        case "select":
            alert("Please select a bar to continue");
            return;
            break;
        case "bronze bar":
            printSuppliesNeeded(totalBudget, maxTime, 0, COPPER_ORE, 1,
                                                            TIN_ORE, 1);
            break;
        case "iron bar":
            printSuppliesNeeded(totalBudget, maxTime, 0, IRON_ORE, 1, 0, 0);
            break;
        case "silver bar":
            printSuppliesNeeded(totalBudget, maxTime, 0, SILVER_ORE, 1, 0, 0);
            break;
        case "steel bar":
            printSuppliesNeeded(totalBudget, maxTime, 1, IRON_ORE, 1, 0, 0);
            break;
        case "gold bar":
            printSuppliesNeeded(totalBudget, maxTime, 0, GOLD_ORE, 1, 0, 0);
            break;
        case "mithril bar":
            printSuppliesNeeded(totalBudget, maxTime, 4, MITHRIL_ORE, 1, 0, 0);
            break;
        case "adamant bar":
            printSuppliesNeeded(totalBudget, maxTime, 6, ADAMANT_ORE, 1, 0, 0);
            break;
        case "rune bar":
            printSuppliesNeeded(totalBudget, maxTime, 8, RUNE_ORE, 1, 0, 0);
            break;
    }
}

// prints the supplies needed
// needs a major refactor to make it more modular
function printSuppliesNeeded(totalBudget, maxTime, amountOfCoal,
                                        id1, amountOfOre1, id2, amountOfOre2) {
    var amountOfNatureRune = 1; // constant
    var priceOfNatureRune = getCurrentPrice(NATURE_RUNE);

    var priceOfOre1 = getCurrentPrice(id1);
    var oreRuneToBuy; // amount of ore/amount of nature runes to buy

    var priceOfOneBar;
    var totalPrice;
    var profitOfOne;
    var totalProfit;

    var timeOfOne;
    var totalTime;

    var priceOfOne;

    var priceOfOre2 = 0;
    if (amountOfOre2 > 0) {
        priceOfOre2 = getCurrentPrice(id2);
    }

    // don't waste time getting the price if it will be unused
    var priceOfCoal = 0;
    var coalToBuy = 0;
    if (amountOfCoal > 0) {
        priceOfCoal = getCurrentPrice(COAL);
    }
    priceOfOne = priceOfNatureRune + (amountOfOre1 * priceOfOre1) +
                                    (amountOfOre2 * priceOfOre2) +
                                    (amountOfCoal * priceOfCoal);

    // round down because the user can't buy over their budget
    oreRuneToBuy = Math.floor(totalBudget / priceOfOne);

    timeOfOne = 1.2; // constant time, all superheating takes 1.2 seconds
    totalTime = timeOfOne * oreRuneToBuy;

    if (totalTime > maxTime) {
        oreRuneToBuy = Math.floor(maxTime / timeOfOne);
        totalTime = timeOfOne * oreRuneToBuy;
    }

    coalToBuy = oreRuneToBuy * amountOfCoal;


    switch(id1) {
        case COPPER_ORE:
        case TIN_ORE:
            $("#ore1Type").text("Copper Ore");
            $("#ore2Type").text("Tin Ore");
            priceOfBar = getCurrentPrice(BRONZE_BAR);
            break;
        case IRON_ORE:
            $("#ore1Type").text("Iron Ore");
            if (amountOfCoal == 0) { // steel bars need 1 coal
                priceOfBar = getCurrentPrice(IRON_BAR);
            } else {
                priceOfBar = getCurrentPrice(STEEL_BAR);
            }
            $("#ore1Type").text("Iron Ore");
            priceOfBar = getCurrentPrice(IRON_BAR);
            break;
        case SILVER_ORE:
            $("#ore1Type").text("Siver Ore");
            priceOfBar = getCurrentPrice(SILVER_BAR);
            break;
        case GOLD_ORE:
            $("#ore1Type").text("Gold Ore");
            priceOfBar = getCurrentPrice(GOLD_BAR);
            break;
        case MITHRIL_ORE:
            $("#ore1Type").text("Mithril Ore");
            priceOfBar = getCurrentPrice(MITHRIL_BAR);
            break;
        case ADAMANT_ORE:
            $("#ore1Type").text("Adamantite Ore");
            priceOfBar = getCurrentPrice(ADAMANT_BAR);
            break;
        case RUNE_ORE:
            $("#ore1Type").text("Runite Ore");
            priceOfBar = getCurrentPrice(RUNE_BAR);
            break;
    }

    totalPrice = (oreRuneToBuy * priceOfNatureRune) +
                (oreRuneToBuy * priceOfOre1) + (oreRuneToBuy * priceOfOre2) +
                (coalToBuy * priceOfCoal);

    profitOfOne = priceOfBar - priceOfOne;
    totalProfit = profitOfOne * oreRuneToBuy;
    $("#stuffToBuyhr").css({'display' : 'block'});

    $("#ore1Type").text($("#ore1Type").text() + " to buy");
    $("#ore1ToBuy").text(oreRuneToBuy);
    if (amountOfOre2 > 0) {
        $("#ore2Type").text($("#ore2Type").text() + " to buy");
        $("#ore2ToBuy").text(oreRuneToBuy);
    }
    if (coalToBuy > 0) {
        $("#coal").text("Coal to buy");
        $("#coalToBuy").text(coalToBuy);
    }
    $("#natureRune").text("Nature Rune to buy");
    $("#natureRuneToBuy").text(oreRuneToBuy);

    $("#statshr").css({'display' : 'block'});

    $("#priceOfOne").text("Price to make one:");
    $("#showPriceOfOne").text(priceOfOne + "gp");
    $("#totalPrice").text("Total Price:");
    $("#showTotalPrice").text(totalPrice + "gp");

    $("#profitOfOne").text("Profit to make one:");
    $("#showProfitOfOne").text(profitOfOne + "gp");
    $("#totalProfit").text("Total profit:");
    $("#showTotalProfit").text(totalProfit + "gp");

    $("#timeOfOne").text("Time to make one:");
    $("#showTimeOfOne").text(timeOfOne + " seconds");
    $("#totalTime").text("Total time:");
    $("#showTotalTime").text(totalTime + " seconds");
}

function getCurrentPrice(itemNum) {
    var currentPrice; // the return statement in the ajax call doesn't work
    $.ajax({
        url: 'https://jsonp.afeld.me/?url=http%3A%2F%2Fservices.runescape.com%2Fm%3Ditemdb_rs%2Fapi%2Fgraph%2F' + itemNum + '.json',
        // Deprecated + "in the process of being removed from the web platform"
        async: false,
        dataType: 'json',
        success: function (json) {
            for (var last in json.daily) {
                if (json.daily.hasOwnProperty(last)) {
                    // give the variable the latest daily price
                    // (today's current price)
                    currentPrice = json.daily[last];
                }
            }
        }
    });
    return currentPrice;
};

function resetShownValues() {
    $("#stuffToBuyhr").css({'display' : 'none'});

    $("#ore1Type").empty();
    $("#ore1ToBuy").empty();

    $("#ore2Type").empty();
    $("#ore2ToBuy").empty();

    $("#coal").empty();
    $("#coalToBuy").empty();

    $("#natureRune").empty();
    $("#natureRuneToBuy").empty();

    $("#statshr").css({'display' : 'none'});

    $("#priceOfOne").empty();
    $("#showPriceOfOne").empty();
    $("#totalPrice").empty();
    $("#showTotalPrice").empty();

    $("#profitOfOne").empty();
    $("#showProfitOfOne").empty();
    $("#totalProfit").empty();
    $("#showTotalProfit").empty();

    $("#timeOfOne").empty();
    $("#showTimeOfOne").empty();
    $("#totalTime").empty();
    $("#showTotalTime").empty();
}
