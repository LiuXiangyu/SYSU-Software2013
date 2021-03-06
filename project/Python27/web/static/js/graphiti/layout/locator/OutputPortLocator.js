/**
The GPL License (GPL)

Copyright (c) 2012 Andreas Herz

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details. You should
have received a copy of the GNU General Public License along with this program; if
not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
MA 02111-1307 USA

**/


/**
 * @class graphiti.layout.locator.OutputPortLocator
 * 
 * Repositions a Figure attached to a Connection when the 
 * Connection is moved. Provides for alignment at the start 
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend graphiti.layout.locator.Locator
 */
graphiti.layout.locator.OutputPortLocator = graphiti.layout.locator.Locator.extend({
    NAME : "graphiti.layout.locator.OutputPortLocator",
    
    /**
     * @constructor
     * Default constructor for a Locator which can layout a port in context of a 
     * {@link grapiti.shape.node.Node}
     * 
     */
    init:function( ){
      this._super();
    },    
   
   /**
    * @method
    * Controls the location of an I{@link graphiti.Figure} 
    *
    * @param {Number} index child index of the figure
    * @param {graphiti.Figure} figure the figure to control
    * 
    * @template
    **/
    relocate:function(index, figure){
        var node = figure.getParent();
        var w = node.getWidth();
        var h = node.getHeight();
        var gap = h/(node.getOutputPorts().getSize()+1);
        figure.setPosition(w, gap*(index+1));
    }
    
});



